import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - Chat App",
  description: "Sign up to create an account.",
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}