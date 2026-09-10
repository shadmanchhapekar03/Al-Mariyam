import { NextResponse } from "next/server";

// Reference to the carts map from cart/route.ts
const carts = new Map<string, any[]>();

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { quantity, sessionId } = body;

  if (!quantity || quantity < 0 || !sessionId) {
    return NextResponse.json(
      { error: "Invalid quantity or session" },
      { status: 400 }
    );
  }

  try {
    const cartItems = carts.get(sessionId) || [];
    const item = cartItems.find((item: any) => item.id === parseInt(id));

    if (!item) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    if (quantity === 0) {
      // Remove item if quantity is 0
      const idx = cartItems.indexOf(item);
      cartItems.splice(idx, 1);
    } else {
      // Update quantity
      item.quantity = quantity;
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
  const body = await request.json();
  const { sessionId } = body;

  if (!sessionId) {
    return NextResponse.json(
      { error: "Session ID is required" },
      { status: 400 }
    );
  }

  try {
    const cartItems = carts.get(sessionId) || [];
    const idx = cartItems.findIndex((item: any) => item.id === parseInt(id));

    if (idx >= 0) {
      cartItems.splice(idx, 1);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to remove from cart" },
      { status: 500 }
    );
  }
}
