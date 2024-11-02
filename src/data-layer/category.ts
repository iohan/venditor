"use server";

import { auth } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { generateSlug } from "@/utils/slug";
import { redirect } from "next/navigation";

export const removeCategoryConnections = async ({
  categories,
  productId,
}: {
  categories: number[];
  productId: number;
}) => {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  if (!productId) {
    throw new Error("productId is required");
  }

  await prisma.productCategory.deleteMany({
    where: {
      categoryId: {
        in: categories,
      },
      productId,
    },
  });
};

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

const generateUniqueCategorySlug = async (baseSlug: string, shopId: number) => {
  let slug = baseSlug;
  let counter = 1;

  while (await prisma.category.findFirst({ where: { slug, shopId } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
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
    data: await Promise.all(
      titles.map(async (t) => {
        const baseSlug = generateSlug(t);
        const uniqueSlug = await generateUniqueCategorySlug(baseSlug, shopId);
        return {
          title: t,
          shopId,
          slug: uniqueSlug,
        };
      }),
    ),
  });

  return response;
};
