"use server";

import { auth } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { redirect } from "next/navigation";

export interface Order {
  id: number;
  orderNumber: number;
  shopId: number;
  created: Date;
  customer: string;
}

export const getOrders = async (input: {
  shopId: number;
}): Promise<Order[]> => {
  const { shopId } = input;
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  if (!shopId) {
    throw new Error("shopId is required");
  }

  const response = await prisma.order.findMany({
    where: {
      Shop: {
        id: shopId,
      },
    },
    select: {
      id: true,
      shopId: true,
      createdAt: true,
      orderNumber: true,
      Customer: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return response.map((order) => ({
    id: order.id,
    shopId: order.shopId,
    created: order.createdAt,
    orderNumber: order.orderNumber,
    customer: order.Customer.name ? order.Customer.name : order.Customer.email,
  }));
};
