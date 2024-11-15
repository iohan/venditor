"use server";

import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import { removeMediaFiles } from "./media";
import { removeCategoryConnections } from "./category";
import { revalidatePath } from "next/cache";

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

interface ProductInput {
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

type AddProductInput = ProductInput;

type UpdateProductInput = ProductInput & {
  id: number;
};

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

export const addProduct = async (data: AddProductInput) => {
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

  if (data.newMediaFiles.length > 0 && productId) {
    await prisma.productMedia.createMany({
      data: data.newMediaFiles.map((id) => ({
        productId,
        mediaId: id,
      })),
    });
  }

  if (data.selectedCategories.length > 0 && productId) {
    await prisma.productCategory.createMany({
      data: data.selectedCategories.map((id) => ({
        productId,
        categoryId: id,
      })),
    });
  }
};

export const deleteProducts = async ({
  shopId,
  productIds,
  pathToRevalidate,
}: {
  shopId: number;
  productIds: number[];
  pathToRevalidate?: string;
}) => {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  if (!shopId) {
    throw new Error("shopId is required");
  }

  // Delete dependencies
  await Promise.all(
    productIds.map(async (id) => {
      try {
        const product = await getProduct({ shopId, productId: id });
        // Delete media files
        if (product.mediaFiles.length > 0) {
          await removeMediaFiles({
            shopId,
            mediaFiles: product.mediaFiles.map((m) => m.id),
            productId: id,
          });
        }

        // Delete category connections
        if (product.selectedCategories.length > 0) {
          await removeCategoryConnections({
            categories: product.selectedCategories.map((c) => Number(c.id)),
            productId: id,
          });
        }
      } catch (e) {
        console.error(e);
      }
    }),
  );

  // Delete products
  await prisma.product.deleteMany({
    where: {
      shopId,
      id: {
        in: productIds,
      },
    },
  });

  if (pathToRevalidate) {
    revalidatePath(pathToRevalidate);
  }
};
