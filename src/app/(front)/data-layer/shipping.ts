"use server";

import prisma from "@/utils/prisma";

export interface ShippingAlternative {
  id: number;
  title: string;
  description?: string;
  basePrice: number;
}

export const getShippingAlternatives = async ({
  shopId,
}: {
  shopId: number;
}): Promise<ShippingAlternative[]> => {
  if (!shopId) {
    throw new Error("shopId is required");
  }

  const response = await prisma.shipping.findMany({
    where: {
      shopId,
    },
  });

  return response.map((shipping) => ({
    id: shipping.id,
    title: shipping.title,
    description: shipping.description ?? undefined,
    basePrice: shipping.basePrice,
  }));
};
