import { NextResponse } from "next/server";

// In-memory storage for orders (prototype only - resets on redeploy)
const orders: any[] = [];
const orderItems: any[] = [];
let orderId = 0;
let orderItemId = 0;

function generateOrderNumber() {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

export async function POST(request: Request) {
  const body = await request.json();
  const {
    customerName,
    email,
    phone,
    shippingAddress,
    totalAmount,
    paymentMethod,
    items,
  } = body;

  if (
    !customerName ||
    !email ||
    !phone ||
    !shippingAddress ||
    !totalAmount ||
    !paymentMethod ||
    !items ||
    items.length === 0
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const orderNumber = generateOrderNumber();

    const createdOrder = {
      id: ++orderId,
      orderNumber,
      customerName,
      email,
      phone,
      shippingAddress,
      totalAmount,
      paymentMethod,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    orders.push(createdOrder);

    // Add order items
    for (const item of items) {
      orderItems.push({
        id: ++orderItemId,
        orderId: createdOrder.id,
        productId: item.productId,
        productName: item.productName,
        price: item.price,
        quantity: item.quantity,
      });
    }

    return NextResponse.json(
      { order: createdOrder, orderNumber },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }

  try {
    const userOrders = orders.filter((order: any) => order.email === email);
    return NextResponse.json({ orders: userOrders }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
