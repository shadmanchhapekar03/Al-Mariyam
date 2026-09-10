import { NextResponse } from "next/server";

// In-memory storage for appointments (prototype only - resets on redeploy)
const appointments: any[] = [];
let appointmentId = 0;

export async function POST(request: Request) {
  const body = await request.json();
  const { fullName, email, phone, department, preferredDate, message } = body;

  if (!fullName || !email || !phone || !department || !preferredDate) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 }
    );
  }

  const created = {
    id: ++appointmentId,
    fullName,
    email,
    phone,
    department,
    preferredDate,
    message: message ?? "",
    createdAt: new Date().toISOString(),
  };

  appointments.push(created);

  return NextResponse.json({ appointment: created }, { status: 201 });
}
