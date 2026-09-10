import { NextResponse } from "next/server";
import { db } from "../../../../db/index";

export async function POST(request: Request) {
  const body = await request.json();
  const { fullName, email, phone, department, preferredDate, message } = body;

  if (!fullName || !email || !phone || !department || !preferredDate) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 }
    );
  }

  const created = await db.createAppointment({
    fullName,
    email,
    phone,
    department,
    preferredDate,
    message: message ?? "",
  });

  return NextResponse.json({ appointment: created }, { status: 201 });
}
