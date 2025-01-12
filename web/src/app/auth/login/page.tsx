"use client";

import { useRouter } from "next/navigation";
import Redirect from "../components/Redirect";
import AuthContainer from "../components/AuthContainer";
import AuthForm from "../components/AuthForm";
import Logo from "../components/Logo";
import Title from "../components/Title";
import TextInput from "../components/TextInput";
import { useState } from "react";
import PasswordInput from "../components/PasswordInput";
import SubmitBtn from "../components/SubmitBtn";
import ForgotPassword from "../components/ForgotPassword";

export default function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ emailOrUsername, password }),
    });

    if (res.status === 200) {
      router.push("/auth/check");
    }
  }
  return (
    <AuthContainer>
      <Redirect url={"register"}>Sign Up</Redirect>
      <AuthForm action={handleSubmit}>
        <Logo />
        <Title>
          Hi, Welcome Back
          <span className="hand-transition ml-2 text-2xl">👋</span>
        </Title>
        <TextInput
          placeholder="Enter your email or username"
          id={"Email or username"}
          action={setEmailOrUsername}
        />
        <PasswordInput placeholder="Enter your password" id={"Password"} action={setPassword} />
        <ForgotPassword />
        <SubmitBtn>Sign In</SubmitBtn>
      </AuthForm>
    </AuthContainer>
  );
}
