"use server";

import { auth } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { redirect } from "next/navigation";

export interface ShopInfo {
  title: string;
}

export const getShopInfo = async ({
  shopId,
}: {
  shopId: number;
}): Promise<ShopInfo> => {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  if (!shopId) {
    throw new Error("shopId is required");
  }

  const response = await prisma.shop.findUnique({
    where: {
      id: shopId,
    },
    select: {
      title: true,
    },
  });

  if (!response) {
    throw new Error("No shop found");
  }

  return response;
};
