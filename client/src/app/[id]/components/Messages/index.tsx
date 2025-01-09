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
    <ul className="absolute top-0 left-0 bottom-0 flex flex-col gap-2 overflow-y-auto max-h-screen pt-16 pb-20 w-full p-4">
      {messages.map((message: string, index: number) => {
        return (
          <li
            key={index}
            className={`px-3 py-2 text-sm rounded-xl bg-[#333] w-fit max-w-[80%] break-words  ${
              index % 2 !== 0 ? "self-end" : "self-start"
            }`}
          >
            {message}
          </li>
        );
      })}
    </ul>
  );
}
