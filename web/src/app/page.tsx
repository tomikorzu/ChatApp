"use client";

import { deleteCookie } from "@/shared/lib/cookies";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  function handleLogout() {
    deleteCookie("auth-token");
    router.push("/auth/login");
  }
  return (
    <>
      <h1>Dashbiard</h1>
      <button
        onClick={handleLogout}
        className="p-2 rounded-md bg-[#e21f1f] transition duration-[.4s] hover:brightness-110"
      >
        Log Out
      </button>
    </>
  );
}
