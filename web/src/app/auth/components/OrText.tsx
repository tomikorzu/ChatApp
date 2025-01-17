import React from "react";

export default function OrText({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full relative flex justify-center items-center mt-3">
      <span className="bg-[#2f2f2f] z-20 px-3">{children}</span>
      <span className="absolute top-1/2 translate-y-[-50%] border border-[#bebbbb60] w-full h-0 "></span>
    </div>
  );
}
