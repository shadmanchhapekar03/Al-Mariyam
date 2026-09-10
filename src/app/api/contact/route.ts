import { NextResponse } from "next/server";
import { db } from "../../../../db/index";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 }
    );
  }

  const created = await db.createContactMessage({ name, email, subject, message });

  return NextResponse.json({ message: created }, { status: 201 });
}
