"use client";

import { useState } from "react";
import AuthContainer from "../components/AuthContainer";
import AuthForm from "../components/AuthForm";
import Logo from "../components/Logo";
import TextInput from "../components/TextInput";
import Title from "../components/Title";
import SubmitBtn from "../components/SubmitBtn";
import Redirect from "../components/Redirect";

export default function CheckPage() {
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    console.log(code);
  }
  return (
    <AuthContainer>
        <Redirect url={"back"}>Go Back</Redirect>
      <AuthForm action={handleSubmit}>
        <Logo />
        <Title>Check your Email</Title>
        <TextInput
          placeholder="Enter your email"
          id="Email"
          action={setEmail}
        />
        <TextInput placeholder="Enter your code" id="Code" action={setCode} />
        <SubmitBtn disabled={loading}>
          {loading ? "Checking..." : "Check Email"}
        </SubmitBtn>
      </AuthForm>
    </AuthContainer>
  );
}
