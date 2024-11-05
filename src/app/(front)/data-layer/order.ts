"use server";

import prisma from "@/utils/prisma";

export interface DeliveryInformation {
  name?: string;
  email?: string;
  mobileNumber?: string;
  country?: string;
}

export interface Shipping {
  title?: string;
  price?: number; // Calculated, basePrice * exchangerate
}

export interface OrderInput {
  shopId: number;
  delivery: DeliveryInformation;
  shipping: Shipping;
  products: {
    productId: number;
    title: string;
    sku: string;
    amount: number;
    media: string;
    price: number; // Calculated, basePrice * exchangerate
  }[];
}

export const addOrder = async (order: OrderInput) => {
  if (!order.shopId) {
    throw new Error("shopId is required");
  }

  await prisma.$transaction(async (tx) => {
    // TODO: Add a better way to check forms
    if (!order.delivery.email) {
      throw new Error("email is required");
    }
    if (!order.delivery.name) {
      throw new Error("name is required");
    }
    if (!order.shipping.title) {
      throw new Error("shipping title is required");
    }
    if (!order.shipping.price) {
      throw new Error("shipping price is required");
    }

    let customer = await tx.customer.findUnique({
      where: {
        email: order.delivery.email,
        ShopCustomer: { some: { shopId: order.shopId } },
      },
    });

    if (!customer) {
      customer = await tx.customer.create({
        data: {
          email: order.delivery.email,
          name: order.delivery.name,
          mobileNumber: order.delivery.mobileNumber,
          ShopCustomer: {
            create: {
              shop: {
                connect: { id: order.shopId },
              },
            },
          },
        },
      });
    }

    const counter = await tx.orderCounter.upsert({
      where: { shopId: order.shopId },
      create: { shopId: order.shopId },
      update: { lastOrderNumber: { increment: 1 } },
      select: { lastOrderNumber: true },
    });

    await tx.order.create({
      data: {
        orderNumber: counter.lastOrderNumber,
        Shop: {
          connect: { id: order.shopId },
        },
        Customer: {
          connect: { id: customer.id },
        },
        OrderShipping: {
          create: {
            title: order.shipping.title,
            price: order.shipping.price,
          },
        },
        OrderProduct: {
          create: order.products.map((product) => ({
            productId: product.productId,
            title: product.title,
            amount: product.amount,
            media: product.media,
            price: product.price,
          })),
        },
      },
    });
  });
};
