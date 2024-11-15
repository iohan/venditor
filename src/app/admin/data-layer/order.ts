"use server";

import { auth } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { redirect } from "next/navigation";

export interface Order {
  id: number;
  shopId: number;
  orderNumber: number;
  created: Date;
  customer: string;
  totalPrice: number;
  itemCount: number;
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
      OrderProduct: {
        select: {
          amount: true,
          price: true,
          orderId: true,
        },
      },
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
    itemCount: order.OrderProduct.reduce(
      (sum, product) => sum + product.amount,
      0,
    ),
    totalPrice: order.OrderProduct.reduce(
      (sum, product) => sum + product.price * product.amount,
      0,
    ),
  }));
};
