import { forgotPasswordTemplate, sendEmail } from "@/server/emails";
import { createToken } from "@/server/jwt/tokens";
import { NextResponse as res } from "next/server";
import { verifyEmail } from "./service";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email)
    return res.json({ error: "The email is required" }, { status: 400 });

  try {
    const username = await verifyEmail(email);

    if (!username)
      return res.json(
        { error: "The email is not registered" },
        { status: 400 }
      );

    const token = createToken({ email });
    const template = forgotPasswordTemplate(email, username, token);

    const result = await sendEmail(email, "Reset your password", template);

    const response = { message: result, email, token };

    return res.json(response, { status: 200 });
  } catch (error) {
    console.error(
      "There was an error in cactch: forgot-password/route.ts",
      error
    );
    res.json({ serverError: error }, { status: 500 });
  }
}
