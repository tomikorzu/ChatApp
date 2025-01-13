"use client";

import { useState } from "react";
import AuthContainer from "../components/AuthContainer";
import AuthForm from "../components/AuthForm";
import Logo from "../components/Logo";
import Title from "../components/Title";
import ErrorText from "../components/ErrorText";
import { useRouter, useSearchParams } from "next/navigation";
import SubmitBtn from "../components/SubmitBtn";
import DotsWord from "@/shared/ui/DotsWord";
import Redirect from "../components/Redirect";
import PasswordInput from "../components/PasswordInput";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ msg: string; location: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const router = useRouter();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/reset-password", {
      method: "PATCH",
      body: JSON.stringify({ token, newPassword }),
    });

    if (res.status === 200) {
      router.push("login");
    } else if (res.status === 400) {
      const { errors } = await res.json();
      setErrors(errors);
      console.log(errors);
      setLoading(false);
    } else {
      router.push("/login");
      setLoading(false);
    }
  }

  return (
    <AuthContainer>
      <Redirect url={"login"}>Sign In</Redirect>
      <AuthForm action={handleSubmit}>
        <Logo />
        <Title>Reset your password</Title>
        <PasswordInput
          placeholder="Enter your new password"
          id={"New Password"}
          action={setNewPassword}
        />
        <ErrorText location="newPassword" errors={errors} />
        <SubmitBtn disabled={loading}>
          {loading ? (
            <DotsWord text={"Changing Password"} />
          ) : (
            "Change Password"
          )}
        </SubmitBtn>
      </AuthForm>
    </AuthContainer>
  );
}
