"use server";

import { auth } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { redirect } from "next/navigation";

export const getCategories = async (shopId: number) => {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return await prisma.productCategory.findMany({
    where: {
      shopId,
    },
    select: {
      id: true,
      title: true,
    },
  });
};
