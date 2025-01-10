"use client";

import Redirect from "../components/Redirect";

export default function LoginPage() {
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/users", {
      method: "POST",
    });
  }
  return (
    <div className="relative h-screen w-full max-w-6xl mx-auto flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <Redirect url={"register"}>Sign Up</Redirect>
        <input type="text" />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
