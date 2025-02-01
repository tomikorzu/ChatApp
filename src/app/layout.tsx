import "./globals.css";

import AsideBar from "@/shared/ui/AsideBar";
import type { Metadata } from "next";
import { SessionProvider } from "@/shared/providers/SessionProvider";
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
      <body className="flex">
        <SessionProvider>
          <SocketProvider>
            <AsideBar />
            {children}
          </SocketProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
