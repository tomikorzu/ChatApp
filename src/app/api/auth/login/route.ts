import { NextResponse as res } from "next/server";
import { validateLogin } from "../middlewares/validateRequest";
import { createToken } from "@/server/jwt/tokens";
import { checkUserExists } from "../middlewares/querys";

export async function POST(req: Request) {
  const { emailOrUsername, password } = await req.json();

  const errorMessages = await validateLogin(emailOrUsername, password);

  if (errorMessages.length > 0) {
    return res.json({ errors: errorMessages }, { status: 400 });
  }

  try {
    const result = await checkUserExists(emailOrUsername, password);

    if (!result) {
      errorMessages.push({
        msg: "Invalid email or username",
        location: "emailOrUsername",
      });
      errorMessages.push({
        msg: "Invalid password",
        location: "password",
      });
      return res.json({ errors: errorMessages }, { status: 400 });
    }
    const token = createToken(result as object);
    const response = { message: "Login successful", token };
    return res.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return res.json(
      { serverError: "There was a server error" },
      { status: 500 }
    );
  }
}
