"use client";

import Dm from "./Dm";
import { usePathname } from "next/navigation";

export default function MenuBar() {
  const pathname = usePathname();
  return <>{pathname.includes("/dm") && <Dm />}</>;
}
