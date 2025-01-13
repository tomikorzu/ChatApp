"use client";

import React, { useState } from "react";
import AuthContainer from "../components/AuthContainer";
import AuthForm from "../components/AuthForm";
import Redirect from "../components/Redirect";
import Logo from "../components/Logo";
import Title from "../components/Title";
import TextInput from "../components/TextInput";
import ErrorText from "../components/ErrorText";
import DotsWord from "@/shared/ui/DotsWord";
import SubmitBtn from "../components/SubmitBtn";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    if (res.status === 200) {
      setLoading(false);
      router.push("reset-password");
    } else if (res.status === 400) {
      setLoading(false);
      const { error } = await res.json();
      setErrors(error);
    } else {
      router.push("login");
    }
  }
  return (
    <AuthContainer>
      <Redirect url={"login"}>Sign In</Redirect>
      <AuthForm action={handleSubmit}>
        <Logo />
        <Title>Forgot your password</Title>
        <TextInput
          placeholder="Enter your email"
          id="Email"
          action={setEmail}
        />
        <ErrorText
          location={"Email"}
          errors={[{ location: "Email", msg: errors }]}
        />
        <SubmitBtn disabled={loading}>
          {loading ? <DotsWord text={"Checking email"} /> : "Send email"}
        </SubmitBtn>
      </AuthForm>
    </AuthContainer>
  );
}
