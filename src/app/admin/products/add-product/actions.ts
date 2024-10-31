"use server";

import { getSignedURL } from "@/data-layer/media";
import { addProduct } from "@/data-layer/product";
import { auth } from "@/utils/auth";
import { computeFileChecksum } from "@/utils/compute-file-checksum";
import { redirect } from "next/navigation";

export const submitNewProduct = async (formData: FormData) => {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const name = formData.get("name") ?? "";
  const description = formData.get("description") ?? "";
  const sku = formData.get("sku") ?? "";
  const media = formData.get("media");

  let mediaObjId: number | undefined = undefined;

  if (media && media instanceof File) {
    try {
      const checksum = await computeFileChecksum(media);

      const signedUrlResult = await getSignedURL(
        media.type,
        media.size,
        checksum,
      );

      if (signedUrlResult.failure !== undefined) {
        throw new Error(signedUrlResult.failure);
      }

      const { url, mediaId } = signedUrlResult.success;
      mediaObjId = mediaId;

      await fetch(url, {
        method: "PUT",
        body: media,
        headers: {
          "Content-Type": media.type,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  await addProduct({
    title: String(name),
    description: String(description),
    draft: false,
    categoryId: 1,
    shopId: 1,
    mediaId: mediaObjId,
  });

  return { status: "success", message: "New product successfully added" };
};
