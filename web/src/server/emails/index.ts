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

export function forgotPasswordTemplate(
  email: string,
  username: string,
  token: string
) {
  const resetPasswordUrl = `http://localhost:3000/auth/reset-password?token=${token}`;

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h1>Forgot your password?</h1>
      <p>Hi,${username}</p>
      <p>We received a request to reset the password associated with your account (${email}).</p>
      <p>Click the link below to reset your password. If you didn’t request this, please ignore this email.</p>
      <p>
        <a 
          href="${resetPasswordUrl}" 
          style="color: #ffffff; text-decoration: none; padding: 10px 20px; background-color: #4CAF50; border-radius: 5px;">
          Reset Password
        </a>
      </p>
      <p>Or copy and paste this link into your browser:</p>
      <p><a href="${resetPasswordUrl}" style="color: #4CAF50;">${resetPasswordUrl}</a></p>
      <p>Thank you,</p>
      <p>Your App Team</p>
    </div>
  `;
}
