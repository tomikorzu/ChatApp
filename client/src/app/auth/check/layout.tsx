import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Check Account - Chat App",
  description: "Check your account",
};

export default function CheckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
