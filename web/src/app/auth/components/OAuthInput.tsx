import Link from "next/link";
import React from "react";

export default function OAuthInput({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-center gap-2 font-semibold border border-[#f1f1f190] hover:bg-[#3b3b3b] transition duration-[.4s] rounded-md py-2 w-1/2 text-md"
    >
      {children}
    </Link>
  );
}
