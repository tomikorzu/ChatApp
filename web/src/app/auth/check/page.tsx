"use client";

import { useState } from "react";
import AuthContainer from "../components/AuthContainer";
import AuthForm from "../components/AuthForm";
import Logo from "../components/Logo";
import TextInput from "../components/TextInput";
import Title from "../components/Title";
import SubmitBtn from "../components/SubmitBtn";
import Redirect from "../components/Redirect";
import ErrorText from "../components/ErrorText";
import { useRouter } from "next/navigation";

export default function CheckPage() {
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [errors, setErrors] = useState<{ msg: string; location: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/check", {
      method: "POST",
      body: JSON.stringify({ email, code }),
    });

    if (res.status === 200) {
      document.cookie =
        "email-check=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      router.push("/dashboard");
    } else if (res.status === 400) {
      const { errors } = await res.json();
      setTimeout(() => {
        setErrors(errors);
        setLoading(false);
      }, 200);
    } else {
      router.push("/auth/login");
    }
  }

  return (
    <AuthContainer>
      <Redirect url={"back"}>Go Back</Redirect>
      <AuthForm action={handleSubmit}>
        <Logo />
        <Title>Check your Email</Title>
        <TextInput placeholder="Enter your code" id="Code" action={setCode} />
        <ErrorText location={"Code"} errors={errors} />
        <SubmitBtn disabled={loading}>
          {loading ? "Checking..." : "Check Email"}
        </SubmitBtn>
      </AuthForm>
    </AuthContainer>
  );
}
