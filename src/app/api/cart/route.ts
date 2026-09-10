import { NextResponse } from "next/server";

// In-memory cart storage (prototype only - resets on redeploy)
const carts = new Map<string, any[]>();
let cartItemId = 0;

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
    const items = carts.get(sessionId) || [];
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
    // Get or create cart for this session
    if (!carts.has(sessionId)) {
      carts.set(sessionId, []);
    }

    const cartItems = carts.get(sessionId)!;
    const existingItem = cartItems.find((item: any) => item.productId === productId);

    if (existingItem) {
      // Update quantity if item already exists
      existingItem.quantity += quantity;
    } else {
      // Add new item
      cartItems.push({
        id: ++cartItemId,
        sessionId,
        productId,
        quantity,
        createdAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({ items: cartItems }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add to cart" },
      { status: 500 }
    );
  }
}
