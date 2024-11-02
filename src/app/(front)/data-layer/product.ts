import prisma from "@/utils/prisma";

export interface ProductType {
  id: number;
  shopId: number;
  title: string;
  discount?: number;
  stock?: number;
  basePrice?: number;
  sku: string;
  mediaFiles: { id: number; url: string }[];
}

export const getProductsInCategory = async ({
  shopId,
  categorySlug,
}: {
  shopId: number;
  categorySlug: string;
}): Promise<ProductType[]> => {
  if (!shopId) {
    throw new Error("shopid is required");
  }

  const response = await prisma.category.findUnique({
    where: {
      shopId,
      slug: categorySlug,
    },
    include: {
      ProductCategory: {
        include: {
          product: {
            include: {
              ProductMedia: {
                select: {
                  media: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!response) {
    return [];
  }

  const products = response.ProductCategory.map((c) => c.product);

  return products.map((p) => ({
    id: p.id,
    shopId,
    title: p.title,
    stock: p.stock ?? undefined,
    basePrice: p.basePrice ?? undefined,
    discount: p.discount ?? undefined,
    sku: p.sku,
    mediaFiles:
      p.ProductMedia.map((pm) => ({ id: pm.media.id, url: pm.media.url })) ??
      [],
  }));
};
