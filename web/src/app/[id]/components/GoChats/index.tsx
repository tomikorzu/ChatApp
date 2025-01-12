import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function GoChats() {
  return (
    <Link href="/dashboard" className="text-2xl mx-2 p-2">
      <ArrowLeft />
    </Link>
  );
}
