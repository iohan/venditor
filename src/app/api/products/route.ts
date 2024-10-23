import { NextResponse } from "next/server";
import { products } from "./dummy";

export async function POST() {
  return NextResponse.json(products);
}
