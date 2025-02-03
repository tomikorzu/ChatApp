"use client";

import Channels from "./Channels/";
import Dm from "./Dm/";
import Groups from "./Groups/";
import Header from "./components/Header";
import Notifications from "./Notifications/";
import Settings from "./Settings/";
import { usePathname } from "next/navigation";
export default function MenuBar() {
  const pathname = usePathname();
  return (
    <>
      {!pathname.includes('/auth') && <Header>
        {pathname === "/" && <Channels />}
        {pathname.includes("/dm") && <Dm />}
        {pathname.includes("/groups") && <Groups />}
        {pathname.includes("/notifications") && <Notifications />}
        {pathname.includes("/settings") && <Settings />}
      </Header>}
    </>
  );
}
