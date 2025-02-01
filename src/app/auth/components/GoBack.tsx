"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GoBack({
  email,
  children,
}: {
  email: string | undefined;
  children: React.ReactNode;
}) {
  const router = useRouter();

  async function handleBtn() {
    await fetch(`/api/users/delete`, {
      method: "DELETE",
      body: JSON.stringify({ email }),
    });
    document.cookie =
      "email-check=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/auth/register");
  }
  return (
    <button
      className="absolute flex justify-center font-semibold items-center gap-1 left-6 top-5 px-4 py-2 rounded-full bg-[#27947c] lg:hover:brightness-110 transition duration-[.4s]"
      type="button"
      onClick={() => handleBtn()}
    >
      <ArrowLeft className="size-5" />
      {children}
    </button>
  );
}
