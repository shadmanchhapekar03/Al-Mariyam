import { NextResponse } from "next/server";
import { products } from "@/lib/products-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let filtered = products;
  if (category) {
    filtered = products.filter((p) => p.category === category);
  }

  return NextResponse.json({ products: filtered }, { status: 200 });
}
