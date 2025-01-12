import { emailConfig } from "./config";

export const sendEmail = async (
  to: string,
  subject: string,
  content: string
) => {
  try {
    await emailConfig(to, subject, content);
    return "The email was sent successfully";
  } catch (err) {
    console.error(err, "There was an error sending the email");
    throw new Error("There was an error sending the email");
  }
};

export function verifyEmailTemplate(username: string, randomCode: string) {
  return `<h1>Hi ${username}, let's confirm your email address!</h1>
    <p>Thanks for signing up. Please use the verification code below to confirm your email address and complete your registration:</p>
    <div style="font-weight: bold;">${randomCode}</div>
    <p>If you didn't sign up for this account, please ignore this email.</p>`;
}

export function resendEmailTemplate(randomCode: string) {
  return `<h1>Resend code</h1>
    <p>Here is your new code:</p>
    <div style="font-weight: bold;">${randomCode}</div>`;
}
