import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat App",
  description: "This is a chat app where you can talk with your friends.",
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
