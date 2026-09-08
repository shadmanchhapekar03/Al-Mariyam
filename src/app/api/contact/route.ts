import { NextResponse } from "next/server";
import { db } from "../../../../db/index";
import { contactMessages } from "../../../../db/schema";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 }
    );
  }

  const [created] = await db
    .insert(contactMessages)
    .values({ name, email, subject, message })
    .returning();

  return NextResponse.json({ message: created }, { status: 201 });
}
