import { NextResponse as res } from "next/server";
import { getUsers } from "@/server/services/users/get";

export async function GET() {
  try {
    const users = await getUsers();
    if (!users) return res.json({ error: "Users not found" }, { status: 404 });
    return res.json({ users }, { status: 200 });
  } catch (error) {
    return res.json({ error }, { status: 500 });
  }
}
