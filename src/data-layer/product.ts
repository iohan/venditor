"use server";

import { auth } from "@/utils/auth";
import { Product } from "@prisma/client";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";

export const getProducts = async ({ shopId }: { shopId: number }) => {
  const response = await prisma.product.findMany({ where: { shopId } });
  return response;
};

export const getProduct = async ({
  shopId,
  productId,
}: {
  shopId: number;
  productId: number;
}) => {
  const response = await prisma.product.findFirst({
    where: { shopId, id: productId },
    include: {
      ProductMedia: {
        include: {
          media: {
            select: {
              id: true,
              url: true,
            },
          },
        },
      },
      ProductCategory: {
        include: {
          category: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
    },
  });

  const product = {
    ...response,
    mediaFiles: response?.ProductMedia.map((pm) => pm.media),
    selectedCategories: response?.ProductCategory.map((pm) => pm.category),
  };

  delete product.ProductMedia;
  delete product.ProductCategory;

  return product;
};

export type ProductType = Awaited<ReturnType<typeof getProduct>>;

export const addProduct = async (
  data: Omit<Product, "id"> & { mediaIds: number[] } & {
    categoryIds: number[];
  },
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

  if (data.mediaIds.length > 0 && productId) {
    await prisma.productMedia.createMany({
      data: data.mediaIds.map((id) => ({
        productId,
        mediaId: id,
      })),
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
