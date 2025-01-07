"use client";

import { useSocket } from "@/shared/hooks/useSocket";
import { useEffect, useState } from "react";

export default function Messages() {
  const [messages, setMessages] = useState<string[]>([]);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on("message", (message: string) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);
  return (
    <ul className="absolute top-16 flex flex-col gap-2 overflow-y-auto max-h-[400px] w-full p-4">
      {messages.map((message: string, index: number) => {
        return (
          <li key={index} className="p-3 text-sm rounded-xl bg-[#333] ">
            {message}
          </li>
        );
      })}
    </ul>
  );
}
