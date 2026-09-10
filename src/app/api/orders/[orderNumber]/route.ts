import { NextResponse } from "next/server";

// Reference to orders and orderItems from orders/route.ts
// For prototype, we maintain in-memory state in each route file
const orders: any[] = [];
const orderItems: any[] = [];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  const { orderNumber } = await params;

  try {
    const order = orders.find((o: any) => o.orderNumber === orderNumber);

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    const items = orderItems.filter((item: any) => item.orderId === order.id);

    return NextResponse.json(
      { order, items },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}
