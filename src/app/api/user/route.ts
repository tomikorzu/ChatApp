import { verifyToken } from "@/server/jwt/tokens";
import { NextResponse as res } from "next/server";

export async function GET(req: Request) {
  const authToken = req.headers.get("Authorization")?.split(" ")[1];
  if (!authToken) return res.json({ error: "Unauthorized" }, { status: 401 });

  const user = verifyToken(authToken);

  return res.json({ user }, { status: 200 });
}
