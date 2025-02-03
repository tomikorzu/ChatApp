import React from "react";

export default function index({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="font-bold text-lg sm:text-2xl ml-2">{children}</h1>
  );
}
