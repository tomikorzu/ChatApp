import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password - Chat App",
  description: "Reset your password.",
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
