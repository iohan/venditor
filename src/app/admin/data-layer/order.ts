"use server";

import { auth } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { redirect } from "next/navigation";

export interface Order {
  id: number;
  shopId: number;
  created: Date;
}

export const getOrders = async ({
  shopId,
}: {
  shopId: number;
}): Promise<Order[]> => {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const response = await prisma.order.findMany({
    where: {
      Shop: {
        id: shopId,
      },
    },
  });

  return response.map((order) => ({
    id: order.id,
    shopId: order.shopId,
    created: order.createdAt,
  }));
};
