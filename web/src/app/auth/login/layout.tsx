import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - Chat App",
  description: "Hi! Welcome back. Please login to your account.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}