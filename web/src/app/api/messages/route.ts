import { NextResponse as res } from "next/server";
import { addMessage, getMessages } from "./services";

export async function GET() {
  try {
    const messages = await getMessages();
    return res.json({ messages }, { status: 200 });
  } catch (error: unknown) {
    return res.json({ error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { message } = await req.json();

  if (!message) {
    return res.json({ error: "Message is required" }, { status: 400 });
  }

  try {
    const messages = await addMessage(message);
    return res.json({ messages }, { status: 201 });
  } catch (error: unknown) {
    return res.json({ error }, { status: 500 });
  }
}
