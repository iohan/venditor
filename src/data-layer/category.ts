"use server";

import { auth } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { redirect } from "next/navigation";

export const getCategories = async (shopId: number) => {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  if (!shopId) {
    throw new Error("shopId is required");
  }

  const response = await prisma.category.findMany({
    where: {
      shopId: shopId,
    },
  });

  return response;
};

export const addCategories = async (titles: string[], shopId: number) => {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  if (!shopId) {
    throw new Error("shopId is required");
  }

  const response = await prisma.category.createManyAndReturn({
    data: titles.map((t) => ({
      title: t,
      shopId,
    })),
  });

  return response;
};
