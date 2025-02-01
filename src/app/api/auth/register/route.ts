import { NextResponse as res } from "next/server";
import { validateRegister } from "../middlewares/validateRequest";
import { addUser } from "./services";
import { sendEmail, verifyEmailTemplate } from "@/server/emails";

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  const errorMessages = await validateRegister(username, email, password);

  if (errorMessages.length > 0) {
    return res.json({ errors: errorMessages }, { status: 400 });
  }

  try {
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();

    await addUser(username, email, password, randomCode);

    const template = verifyEmailTemplate(username, randomCode);

    const result = await sendEmail(email, "Verify your email", template);

    const response = { message: result, email };

    return res.json(response, { status: 201 });
  } catch (error) {
    console.error(error);
    return res.json(
      { serverError: "There was a server error" },
      { status: 500 }
    );
  }
}
