"use client";

import { useSocket } from "@/shared/hooks/useSocket";
import Link from "next/link";

export default function UserInfo() {
  const socket = useSocket();
  const data = {
    image: "/images/me.jpeg",
    name: "amor",
    state: "Online",
  };

  const id = 1;

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
          {}
        </h3>
        <span className="text-[10px]">{data.state}</span>
      </div>
    </Link>
  );
}
