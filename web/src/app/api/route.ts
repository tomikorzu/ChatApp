import { NextResponse as res } from "next/server";

export async function GET() {
  return res.json({ message: "Chat Api is running!" }, { status: 200 });
}
