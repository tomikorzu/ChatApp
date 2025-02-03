import React from "react";

export default function index({ children }: { children: React.ReactNode }) {
  return (
    <header className="relative hidden md:flex flex-col lg:min-w-[340px] px-2 pt-5 h-screen bg-[#2f2f2f]">
      {children}
    </header>
  );
}
