import { NextResponse as res } from "next/server";
import { checkCode, emailVerified } from "./services/route";
import { createToken } from "@/server/jwt/tokens";

export interface User {
  id: string | number;
  email: string;
  username: string;
  created_at?: string;
}

export async function POST(req: Request) {
  const { email, code } = await req.json();

  if (!email) return res.json({ errors: "Email is required" }, { status: 404 });
  try {
    const isEmailVerified = await emailVerified(email);

    if (isEmailVerified === 1) {
      return res.json({ errors: "Email is already verified" }, { status: 409 });
    } else if (typeof isEmailVerified !== "number") {
      return res.json({ errors: isEmailVerified }, { status: 404 });
    }

    if (!code) return res.json({ errors: "Code is required" }, { status: 400 });

    if (code.length !== 6)
      return res.json(
        { errors: "Code must be 6 characters long" },
        { status: 400 }
      );

    const user = await checkCode(email, code);

    if (!user)
      return res.json({ errors: "Code is incorrect" }, { status: 400 });

    const token = createToken({
      id: user.id,
      email: user.email,
      username: user.username,
      created_at: user.created_at,
    });

    return res.json(
      { message: "User verified successfully", token },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return res.json({ errors: error }, { status: 500 });
  }
}
