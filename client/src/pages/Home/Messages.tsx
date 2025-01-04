import { useEffect, useState } from "react";
import { socket } from "../../utils/socket";
import Message from "./Message";

export default function Messages() {
  const [messages, setMessages] = useState<string[]>([]);
  useEffect(() => {
    socket.on("message", (message: string) => {
      setMessages((prev) => [...prev, message]);
    });
  }, []);
  return (
    <ul className="absolute top-16 flex flex-col gap-2 overflow-y-auto max-h-[400px] w-full p-4">
      {messages.map((message: string, index: number) => {
        return <Message key={index} message={message} />;
      })}
    </ul>
  );
}
