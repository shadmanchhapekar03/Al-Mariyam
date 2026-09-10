import { NextResponse } from "next/server";
import { db } from "@/db";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { quantity } = body;

  if (!quantity || quantity < 0) {
    return NextResponse.json(
      { error: "Invalid quantity" },
      { status: 400 }
    );
  }

  try {
    if (quantity === 0) {
      // Delete if quantity is 0
      await db.removeFromCart(parseInt(id));
    } else {
      // Update quantity
      await db.updateCartItem(parseInt(id), quantity);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update cart item" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await db.removeFromCart(parseInt(id));
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to remove from cart" },
      { status: 500 }
    );
  }
}
