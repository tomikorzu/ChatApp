"use client";

import { useSocket } from "@/shared/hooks/useSocket";
import { ArrowUp } from "lucide-react";
import { useState } from "react";

export default function SendMessageForm() {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const socket = useSocket();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (inputValue.trim().length === 0) return;
    setIsTyping(false);

    if (!socket) return;

    socket.emit("message", inputValue);
    setInputValue("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-4 w-[90%] p-2 rounded-full flex justify-between items-center gap-2 bg-[#2f2f2f]"
    >
      <input
        type="text"
        value={inputValue}
        placeholder="Enter your message"
        onChange={(e) => {
          const value = e.target.value;
          setIsTyping(value.length > 0);
          setInputValue(value);
        }}
        className="p-2 text-sm w-full rounded-md bg-transparent pr-11 placeholder:text-[#888]"
      />
      <button
        type="submit"
        aria-disabled={!isTyping}
        className={`${
          isTyping
            ? "opacity-100 pointer-events-auto"
            : "opacity-50 pointer-events-none"
        } bg-[#f1f1f1] text-slate-950 absolute right-2 rounded-full size-8 flex items-center justify-center transition duration[.4s]`}
      >
        <ArrowUp className="size-5" />
      </button>
    </form>
  );
}
