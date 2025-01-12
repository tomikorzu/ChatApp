import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password - Chat App",
  description: "Forgot password page: reset your password",
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
