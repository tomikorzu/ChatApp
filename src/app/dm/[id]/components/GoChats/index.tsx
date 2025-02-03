import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GoChats() {
  return (
    <Link href="/dm" className="text-2xl mx-2 p-2">
      <ArrowLeft />
    </Link>
  );
}
