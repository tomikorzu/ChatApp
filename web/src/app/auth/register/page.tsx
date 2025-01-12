"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Redirect from "../components/Redirect";
import SubmitBtn from "../components/SubmitBtn";
import AuthForm from "../components/AuthForm";
import AuthContainer from "../components/AuthContainer";
import Title from "../components/Title";
import Logo from "../components/Logo";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import ErrorText from "../components/ErrorText";
import DotsWord from "@/shared/ui/DotsWord";
import { createCookie } from "@/shared/lib/cookies";

export default function RegisterPage() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [errors, setErrors] = useState<{ msg: string; location: string }[]>([]);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    });

    if (res.status === 201) {
      createCookie("email-check", email);
      router.push("check");
      setTimeout(() => setLoading(false), 200);
      return;
    } else if (res.status === 400) {
      const { errors } = await res.json();
      setTimeout(() => {
        setErrors(errors);
        setLoading(false);
      }, 200);
    } else {
      setTimeout(() => setLoading(false), 200);
      console.error("An error occurred");
    }
  }
  return (
    <AuthContainer>
      <Redirect url={"login"}>Sign In</Redirect>
      <AuthForm action={handleSubmit}>
        <Logo />
        <Title>Create an account</Title>
        <TextInput
          placeholder="Enter your username"
          id="Username"
          action={setUsername}
        />
        <ErrorText location={"username"} errors={errors} />
        <TextInput
          placeholder="Enter your email"
          id="Email"
          action={setEmail}
        />
        <ErrorText location={"email"} errors={errors} />
        <PasswordInput
          placeholder="Enter your password"
          id="Password"
          action={setPassword}
        />
        <ErrorText location={"password"} errors={errors} />
        <SubmitBtn disabled={loading}>
          {loading ? <DotsWord text={"Creating Account"} /> : "Sign Up"}
        </SubmitBtn>
      </AuthForm>
    </AuthContainer>
  );
}
