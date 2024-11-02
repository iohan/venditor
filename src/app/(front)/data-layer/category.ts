import prisma from "@/utils/prisma";

export const getCategories = async (shopId: number) => {
  if (!shopId) {
    throw new Error("shopId is required");
  }

  const response = await prisma.category.findMany({
    where: {
      shopId: shopId,
    },
    select: {
      slug: true,
      title: true,
    },
  });

  return response;
};
