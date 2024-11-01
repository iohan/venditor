"use server";

import { getSignedURL } from "@/data-layer/media";
import { addProduct } from "@/data-layer/product";
import { auth } from "@/utils/auth";
import { computeFileChecksum } from "@/utils/compute-file-checksum";
import { redirect } from "next/navigation";
import { NewProduct } from "./AddProductForm";
import { addCategories } from "@/data-layer/category";

export const submitNewProduct = async (product: NewProduct) => {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  if (!product.shopId) {
    throw new Error("shopId is required");
  }

  let mediaObjId: number | undefined = undefined;

  if (product.media && product.media instanceof File) {
    try {
      const checksum = await computeFileChecksum(product.media);

      const signedUrlResult = await getSignedURL(
        product.media.type,
        product.media.size,
        checksum,
      );

      if (signedUrlResult.failure !== undefined) {
        throw new Error(signedUrlResult.failure);
      }

      const { url, mediaId } = signedUrlResult.success;
      mediaObjId = mediaId;

      await fetch(url, {
        method: "PUT",
        body: product.media,
        headers: {
          "Content-Type": product.media.type,
        },
      });
    } catch (e) {
      console.error(e);
    }
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
    title: String(product.title),
    description: String(product.description),
    draft: false,
    shopId: 1,
    mediaId: mediaObjId,
    categoryIds: [...selectedCategoryIds, ...newCategoryIds],
  });

  return { status: "success", message: "New product successfully added" };
};
