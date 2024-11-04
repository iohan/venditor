"use server";

import { getSignedURL } from "@/app/admin/data-layer/media";
import { addProduct, ProductType } from "@/app/admin/data-layer/product";
import { auth } from "@/utils/auth";
import { computeFileChecksum } from "@/utils/compute-file-checksum";
import { redirect } from "next/navigation";
import { addCategories } from "@/app/admin/data-layer/category";

export const submitNewProduct = async (
  product: ProductType,
  mediaFormData: FormData,
) => {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  if (!product.shopId) {
    throw new Error("shopId is required");
  }

  const mediaFiles = mediaFormData.getAll("mediaFiles");
  const mediaObjIds: number[] = [];

  if (mediaFiles) {
    await Promise.all(
      mediaFiles.map(async (mediaFile) => {
        if (mediaFile && mediaFile instanceof File) {
          try {
            const checksum = await computeFileChecksum(mediaFile);

            const signedUrlResult = await getSignedURL(
              mediaFile.type,
              mediaFile.size,
              checksum,
            );

            if (signedUrlResult.failure !== undefined) {
              throw new Error(signedUrlResult.failure);
            }

            const { url, mediaId } = signedUrlResult.success;
            console.log(mediaId);
            mediaObjIds.push(mediaId);

            await fetch(url, {
              method: "PUT",
              body: mediaFile,
              headers: {
                "Content-Type": mediaFile.type,
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

  await addProduct({
    title: product.title,
    description: product.description,
    draft: false,
    shopId: 1,
    newMediaFiles: [...mediaObjIds],
    sku: product.sku,
    basePrice: product.basePrice,
    stock: product.stock,
    discount: product.discount,
    selectedCategories: [...selectedCategoryIds, ...newCategoryIds],
  });

  return { status: "success", message: "New product successfully added" };
};
