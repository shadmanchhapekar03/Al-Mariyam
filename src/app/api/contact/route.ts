import { NextResponse } from "next/server";

// In-memory storage for contact messages (prototype only - resets on redeploy)
const messages: any[] = [];
let messageId = 0;

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 }
    );
  }

  const created = {
    id: ++messageId,
    name,
    email,
    subject,
    message,
    createdAt: new Date().toISOString(),
  };

  messages.push(created);

  return NextResponse.json({ message: created }, { status: 201 });
}
