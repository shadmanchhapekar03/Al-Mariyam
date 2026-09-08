import { NextResponse } from "next/server";
import { db } from "@/db";
import { cartItems, products as productsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");

  if (!sessionId) {
    return NextResponse.json(
      { error: "Session ID is required" },
      { status: 400 }
    );
  }

  try {
    const items = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.sessionId, sessionId));

    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { sessionId, productId, quantity } = body;

  if (!sessionId || !productId || !quantity) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    // Check if product exists
    const product = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, productId));

    if (product.length === 0) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Check if item already in cart
    const existing = await db
      .select()
      .from(cartItems)
      .where(
        eq(cartItems.sessionId, sessionId)
      );

    const existingItem = existing.find(
      (item) => item.productId === productId
    );

    if (existingItem) {
      // Update quantity
      await db
        .update(cartItems)
        .set({ quantity: existingItem.quantity + quantity })
        .where(eq(cartItems.id, existingItem.id));
    } else {
      // Add new item
      await db.insert(cartItems).values({
        sessionId,
        productId,
        quantity,
      });
    }

    const updatedItems = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.sessionId, sessionId));

    return NextResponse.json({ items: updatedItems }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add to cart" },
      { status: 500 }
    );
  }
}
