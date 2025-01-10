"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Redirect from "../components/Redirect";
import EyePassword from "../components/EyePassword";
import SubmitBtn from "../components/SubmitBtn";
import AuthForm from "../components/AuthForm";
import AuthContainer from "../components/AuthContainer";
import Title from "../components/Title";
import Logo from "../components/Logo";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";

export default function RegisterPage() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ fullname: username, email, password }),
    });

    if (res.status === 201) {
      router.push("/auth/check");
    } else {
    }
  }
  return (
    <AuthContainer>
      <Redirect url={"login"}>Sign In</Redirect>
      <AuthForm action={handleSubmit}>
        <Logo />
        <Title>Create an account</Title>
        <TextInput placeholder="Enter your username" action={setUsername} />
        <TextInput placeholder="Enter your email" action={setEmail} />
        <PasswordInput placeholder="Enter your password" action={setPassword} />
        <SubmitBtn>Sign Up</SubmitBtn>
      </AuthForm>
    </AuthContainer>
  );
}
