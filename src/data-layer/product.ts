"use server";

import { auth } from "@/utils/auth";
import { Product } from "@prisma/client";
import { redirect } from "next/navigation";

export const addProduct = async (
  data: Omit<Product, "id"> & { mediaId?: number },
) => {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const newProduct = await prisma.product.create({
    data: {
      title: data.title,
      description: data.description,
      draft: data.draft,
      shopId: data.shopId,
      categoryId: data.categoryId,
    },
  });

  if (data.mediaId !== undefined && newProduct) {
    const productId = newProduct.id;

    await prisma.productMedia.create({
      data: {
        productId,
        mediaId: data.mediaId,
      },
    });
  }
};
