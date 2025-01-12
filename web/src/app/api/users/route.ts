import { NextResponse as res } from "next/server";
import { getUsers } from "./services";

export async function GET() {
  try {
    const users = await getUsers();
    return res.json({ users }, { status: 200 });
  } catch (error) {
    return res.json({ error }, { status: 500 });
  }
}
