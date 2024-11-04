"use server";

import { getSignedURL, removeMediaFiles } from "@/app/admin/data-layer/media";
import {
  getProductMediaFiles,
  ProductType,
  updateProduct,
} from "@/app/admin/data-layer/product";
import { auth } from "@/utils/auth";
import { computeFileChecksum } from "@/utils/compute-file-checksum";
import { redirect } from "next/navigation";
import { addCategories } from "@/app/admin/data-layer/category";

export const submitUpdateProduct = async (
  product: ProductType,
  uploadedMedia: FormData,
) => {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  if (!product.shopId) {
    throw new Error("shopId is required");
  }

  if (!product.id) {
    throw new Error("Product Id is required");
  }

  // MediaFiles

  // Remove media files
  const productMediaFiles = await getProductMediaFiles({
    shopId: product.shopId,
    productId: product.id,
  });

  const mediaIdsToRemove: number[] = [];
  productMediaFiles.mediaFiles.forEach((mediaFile) => {
    if (!product.mediaFiles.some((m) => m.id === mediaFile.id)) {
      mediaIdsToRemove.push(mediaFile.id);
    }
  });

  if (mediaIdsToRemove.length > 0) {
    await removeMediaFiles({
      shopId: product.shopId,
      productId: product.id,
      mediaFiles: mediaIdsToRemove,
    });
  }

  // Upload new media files
  const uploadedFiles = uploadedMedia.getAll("mediaFiles");
  const uploadedMediaIds: number[] = [];

  if (uploadedFiles) {
    await Promise.all(
      uploadedFiles.map(async (uploadedFile) => {
        if (uploadedFile && uploadedFile instanceof File) {
          try {
            const checksum = await computeFileChecksum(uploadedFile);

            const signedUrlResult = await getSignedURL(
              uploadedFile.type,
              uploadedFile.size,
              checksum,
            );

            if (signedUrlResult.failure !== undefined) {
              throw new Error(signedUrlResult.failure);
            }

            const { url, mediaId } = signedUrlResult.success;
            uploadedMediaIds.push(mediaId);

            await fetch(url, {
              method: "PUT",
              body: uploadedFile,
              headers: {
                "Content-Type": uploadedFile.type,
              },
            });
          } catch (e) {
            console.error(e);
          }
        }
      }),
    );
  }

  const newCategories = product.selectedCategories.filter((c) => !c.id);
  let newCategoryIds: number[] = [];
  const selectedCategoryIds: number[] = [];

  if (newCategories.length > 0) {
    const newCategoriesResponse = await addCategories(
      newCategories.map((c) => c.title),
      product.shopId,
    );

    newCategoryIds = newCategoriesResponse.map((c) => c.id);
  }

  product.selectedCategories.forEach((c) => {
    if (c.id !== undefined) {
      selectedCategoryIds.push(c.id);
    }
  });

  await updateProduct({
    id: product.id,
    title: product.title,
    description: product.description,
    draft: product.draft,
    shopId: product.shopId,
    newMediaFiles: [...uploadedMediaIds],
    sku: product.sku,
    basePrice: product.basePrice,
    stock: product.stock,
    discount: product.discount,
    selectedCategories: [...selectedCategoryIds, ...newCategoryIds],
  });

  return { status: "success", message: "New product successfully added" };
};
