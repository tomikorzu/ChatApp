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
import { createCookie } from "@/shared/lib/cookies";
import ErrorText from "../components/ErrorText";
import DotsWord from "@/shared/ui/DotsWord";

export default function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [errors, setErrors] = useState<{ msg: string; location: string }[]>([]);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ emailOrUsername, password }),
    });

    if (res.status === 200) {
      const { token } = await res.json();
      setTimeout(() => setLoading(false), 200);
      createCookie("auth-token", token);
      router.push("/");
    } else {
      const { errors } = await res.json();
      setTimeout(() => {
        setErrors(errors);
        setLoading(false);
      }, 200);
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
        <ErrorText location={"emailOrUsername"} errors={errors} />
        <PasswordInput
          placeholder="Enter your password"
          id={"Password"}
          action={setPassword}
        />
        <ErrorText location={"password"} errors={errors} />
        <ForgotPassword />
        <SubmitBtn disabled={loading}>
          {loading ? <DotsWord text={"Joining In"} /> : "Sign In"}
        </SubmitBtn>
      </AuthForm>
    </AuthContainer>
  );
}
