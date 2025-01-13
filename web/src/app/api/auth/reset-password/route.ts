import { NextResponse as res } from "next/server";
import { validateNewPassword } from "../middlewares/validateRequest";
import { verifyToken } from "@/server/jwt/tokens";
import { changePassword, verifyPasswordNotBeTheSame } from "./service";

export async function PATCH(req: Request) {
  const { token, newPassword } = await req.json();

  if (!token)
    return res.json({ error: "The token is required" }, { status: 500 });

  const errorsMessages = validateNewPassword(newPassword);

  if (errorsMessages.length > 0)
    return res.json({ errors: errorsMessages }, { status: 400 });

  try {
    const tokenRes = verifyToken(token);

    if (!tokenRes.email.includes("@")) {
      return res.json({ error: "The token is invalid" }, { status: 500 });
    }
    const isTheSame = await verifyPasswordNotBeTheSame(tokenRes, newPassword);

    if (isTheSame === true)
      return res.json(
        { error: "The password can't be the same than the last one" },
        { status: 400 }
      );

    await changePassword(tokenRes.email, newPassword);

    return res.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "There was an error in catch: reset-password/route.ts",
      error
    );
    return res.json({ serverError: error }, { status: 500 });
  }
}
