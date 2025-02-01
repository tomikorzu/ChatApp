import { NextResponse as res } from "next/server";
import { changeCode } from "./service";
import { resendEmailTemplate, sendEmail } from "@/server/emails";

export async function PATCH(req: Request) {
  const { email } = await req.json();
  try {
    const newCode = await changeCode(email);
    const template = resendEmailTemplate(newCode as string);
    const result = await sendEmail(email, "Resend code", template);

    const response = { message: result, email };
    return res.json(response, { status: 200 });
  } catch (error) {
    console.error(
      "There was an error in catch from api/auth/check/resend/route.ts",
      error
    );
    return res.json(
      { serverError: "There was a server error" },
      { status: 500 }
    );
  }
}
