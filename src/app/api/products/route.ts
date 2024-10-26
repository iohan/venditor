import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const products = await prisma.product.findMany();
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Could not fetch products", msg: error }),
      { status: 400 },
    );
  }
}
