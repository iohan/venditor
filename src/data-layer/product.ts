"use server";

import { auth } from "@/utils/auth";
import { Product } from "@prisma/client";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";

export const getProducts = async ({ shopId }: { shopId: number }) => {
  const response = await prisma.product.findMany({ where: { shopId } });
  return response;
};

export const addProduct = async (
  data: Omit<Product, "id"> & { mediaId?: number } & { categoryIds: number[] },
) => {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  if (!data.shopId) {
    throw new Error("shopId is required");
  }

  const newProduct = await prisma.product.create({
    data: {
      title: data.title,
      description: data.description,
      draft: data.draft,
      shopId: data.shopId,
      sku: data.sku,
      discount: data.discount,
      basePrice: data.basePrice,
      stock: data.stock,
    },
  });

  const productId = newProduct.id;

  if (data.mediaId !== undefined && productId) {
    await prisma.productMedia.create({
      data: {
        productId,
        mediaId: data.mediaId,
      },
    });
  }

  if (data.categoryIds.length > 0 && productId) {
    await prisma.productCategory.createMany({
      data: data.categoryIds.map((id) => ({
        productId,
        categoryId: id,
      })),
    });
  }
};
