import { NextResponse as res } from "next/server";
import { getUserById } from "./service";

export async function GET(req: Request) {
  const id = req.url.split("http://localhost:3000/api/users/")[1];
  try {
    const user = await getUserById(parseInt(id));
    return res.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error getting user", error);
    return res.json({ error }, { status: 500 });
  }
}
