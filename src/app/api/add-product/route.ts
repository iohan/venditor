import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, draft, categoryId } = body;

    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        draft,
        categoryId: Number(categoryId),
      },
    });

    return new NextResponse(JSON.stringify(newProduct), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Error creating task", msg: error }),
      { status: 400 },
    );
  }
}
