"use client";

import { useSession } from "@/shared/providers/SessionProvider";
import { useSocket } from "@/shared/providers/SocketProvider";
import DotsWord from "@/shared/ui/DotsWord";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UserInfo() {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [userTyping, setUserTyping] = useState<string>("");
  const data = {
    image: "/images/me.jpeg",
    name: "amor",
    state: "Online",
  };

  const socket = useSocket();

  useEffect(() => {
    socket?.on("typing", (isTyping: boolean, username: string) => {
      if (isTyping === true) {
        setIsTyping(true);
        setUserTyping(username);
      } else {
        setIsTyping(false);
        setUserTyping("");
      }
    });
  }, [socket]);

  const id = 1;

  const session = useSession();

  return (
    <Link
      href={`${id}/friend-profile`}
      className="flex gap-2 w-full items-center justify-start bg-[#212121]"
    >
      <img
        src={data.image}
        alt={`${data.name} User Image`}
        className="size-9 object-cover rounded-full"
      />
      <div className="flex flex-col">
        <h3 className="font-bold max-w-[170px] text-sm whitespace-nowrap text-ellipsis overflow-hidden">
          {session?.user?.username}
        </h3>
        {!isTyping ? (
          <span className="text-[10px]">{data.state}</span>
        ) : (
          <DotsWord text={`${userTyping} is typing`} />
        )}
      </div>
    </Link>
  );
}
