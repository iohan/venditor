"use server";

import { auth } from "@/utils/auth";
import { Product } from "@prisma/client";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";

export interface ProductType {
  id?: number;
  shopId?: number;
  title: string;
  draft: boolean;
  description?: string;
  stock?: number;
  basePrice?: number;
  discount?: number;
  sku: string;
  selectedCategories: { id?: number; title: string }[];
  mediaFiles: { id: number; url: string }[];
}

interface UpdateProductInput {
  id: number;
  shopId: number;
  title: string;
  draft: boolean;
  description?: string;
  stock?: number;
  basePrice?: number;
  discount?: number;
  sku: string;
  selectedCategories: number[];
  newMediaFiles: number[];
}

export const getProductMediaFiles = async ({
  shopId,
  productId,
}: {
  shopId: number;
  productId: number;
}): Promise<{ mediaFiles: { id: number; url: string }[] }> => {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  if (!shopId) {
    throw new Error("shopId is required");
  }

  const response = await prisma.product.findFirst({
    where: { shopId, id: productId },
    select: {
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
    },
  });

  return response
    ? {
        mediaFiles: response.ProductMedia.map((m) => m.media),
      }
    : { mediaFiles: [] };
};

export const getProducts = async ({ shopId }: { shopId: number }) => {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  if (!shopId) {
    throw new Error("shopId is required");
  }

  const response = await prisma.product.findMany({ where: { shopId } });
  return response;
};

export const getProduct = async ({
  shopId,
  productId,
}: {
  shopId: number;
  productId: number;
}): Promise<ProductType> => {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  if (!shopId) {
    throw new Error("shopId is required");
  }

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
  if (!response) {
    throw new Error("Could'nt find a product");
  }

  return {
    id: response.id,
    shopId,
    title: response.title,
    draft: response.draft,
    description: response.description ?? undefined,
    stock: response.stock ?? undefined,
    basePrice: response.basePrice ?? undefined,
    discount: response.discount ?? undefined,
    sku: response.sku,
    mediaFiles: response?.ProductMedia.map((pm) => pm.media) ?? [],
    selectedCategories:
      response?.ProductCategory.map((pm) => pm.category) ?? [],
  };
};

export const updateProduct = async (data: UpdateProductInput) => {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  if (!data.shopId) {
    throw new Error("shopId is required");
  }

  await prisma.product.update({
    where: {
      id: data.id,
      shopId: data.shopId,
    },
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

  if (data.newMediaFiles.length > 0 && data.id) {
    await prisma.productMedia.createMany({
      data: data.newMediaFiles.map((id) => ({
        productId: data.id,
        mediaId: id,
      })),
    });
  }

  if (data.selectedCategories.length > 0 && data.id) {
    await prisma.productCategory.deleteMany({
      where: {
        productId: data.id,
      },
    });

    await prisma.productCategory.createMany({
      data: data.selectedCategories.map((id) => ({
        productId: data.id,
        categoryId: id,
      })),
    });
  }
};

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
