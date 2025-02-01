"use client";

import Button from "./Link";
import { sections } from "./sections";
import { usePathname } from "next/navigation";

export default function AsideBar() {
  const pathname = usePathname();
  return (
    <header className="hidden lg:flex flex-col items-center justify-between pt-6 pb-2 px-3 z-20 bg-[#1c1c1c]">
      <ul className="flex flex-col gap-1 border-b border-[#444] pb-2">
        {sections.mainSections.map((section) => {
          return (
            <li key={section.name} className="">
              <Button
                pathname={pathname}
                name={section.name}
                url={section.url}
                icon={section.icon}
              />
            </li>
          );
        })}
      </ul>
      <Button
        pathname={pathname}
        name={sections.settings.name}
        url={sections.settings.url}
        icon={sections.settings.icon}
      />
    </header>
  );
}
