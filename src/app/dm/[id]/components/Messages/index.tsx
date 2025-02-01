"use client";

import { useSession } from "@/shared/providers/SessionProvider";
import { useSocket } from "@/shared/providers/SocketProvider";
import { useEffect, useState } from "react";

export default function Messages() {
  const [messages, setMessages] = useState<
    { message: string; username: string }[]
  >([]);
  const socket = useSocket();
  const session = useSession();

  useEffect(() => {
    if (!socket) return;

    socket.on("message", (message: string, username: string) => {
      setMessages((prev) => [...prev, { message, username }]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);
  return (
    <ul className="absolute top-0 left-0 bottom-0 flex flex-col gap-2 overflow-y-auto max-h-screen pt-16 pb-20 w-full p-4">
      {messages.map(({ message, username }, index: number) => {
        return (
          <li
            key={index}
            className={`px-3 py-2 text-sm rounded-xl bg-[#333] w-fit max-w-[80%] break-words  ${
              username === session?.user.username ? "self-end" : "self-start"
            }`}
          >
            {`${username}: ${message}`}
          </li>
        );
      })}
    </ul>
  );
}
