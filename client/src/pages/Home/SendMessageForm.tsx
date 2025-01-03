import { useState } from "react";
import { socket } from "../../utils/socket";

export default function SendMessageForm() {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (inputValue.trim().length === 0) return;
    setInputValue("");
    setIsTyping(false);

    socket.emit("message", inputValue, (response: string) => {
      console.log(response);
    });
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-2 w-[95%] p-2 rounded-full flex justify-between items-center gap-2 bg-[#2f2f2f]"
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
        className="p-2 w-full rounded-md bg-transparent max-w-[96%] placeholder:text-[#888]"
      />
      <button
        type="submit"
        aria-disabled={!isTyping}
        className={`${
          isTyping
            ? "opacity-100 pointer-events-auto"
            : "opacity-50 pointer-events-none"
        } bg-[#f1f1f1] text-slate-950 absolute right-2 rounded-full size-9 flex items-center justify-center transition duration[.4s]`}
      >
        <i className="fa-solid fa-arrow-up" />
      </button>
    </form>
  );
}
