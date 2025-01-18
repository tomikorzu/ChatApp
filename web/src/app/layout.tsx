import type { Metadata } from "next";
import "./globals.css";
import { SocketProvider } from "@/shared/providers/SocketProvider";

export const metadata: Metadata = {
  title: "Chat App",
  description: "This is a chat app where you can talk with your friends.",
  icons: "/images/socketio.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>
        <SocketProvider>{children}</SocketProvider>
      </body>
    </html>
  );
}
