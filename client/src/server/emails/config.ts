import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { template } from "./template";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
} as SMTPTransport.Options);

export const emailConfig = async (
  to: string,
  subject: string,
  content: string
) => {
  try {
    await transporter.sendMail({
      from: `Chat App <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: template(content),
    });
    console.log("Email sent successfully");
  } catch (err) {
    console.error("Error sending email:", err);
    throw new Error("There was an error sending the email");
  }
};
