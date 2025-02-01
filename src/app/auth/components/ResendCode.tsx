import { deleteCookie } from "@/shared/lib/cookies";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResendCode({ email }: { email: string | undefined }) {
  const [counter, setCounter] = useState<number>(60);
  const [disabled, setDisabled] = useState<boolean>(false);
  const router = useRouter();
  async function handleResend() {
    setDisabled(true);
    const interval = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
      setCounter(60);
      setDisabled(false);
    }, 60000);
    if (!email) {
      deleteCookie("email-check");
      router.push("/auth/register");
    }
    await fetch("/api/auth/check/resend", {
      method: "PATCH",
      body: JSON.stringify({ email }),
    });
  }
  return (
    <div className="flex items-center self-start gap-1 mt-[-3px]">
      <button
        onClick={handleResend}
        type="button"
        disabled={disabled}
        className={`${
          disabled ? "cursor-not-allowed opacity-80 font-normal" : "font-bold"
        } font-bold text-md`}
      >
        Resend code
      </button>
      {disabled && (
        <span className="text-md">
          {counter < 10 && "0"}
          {counter}
        </span>
      )}
    </div>
  );
}
