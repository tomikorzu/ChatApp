"use client";

import { useEffect, useState } from "react";
import AuthContainer from "../components/AuthContainer";
import AuthForm from "../components/AuthForm";
import Logo from "../components/Logo";
import TextInput from "../components/TextInput";
import Title from "../components/Title";
import SubmitBtn from "../components/SubmitBtn";
import ErrorText from "../components/ErrorText";
import { useRouter } from "next/navigation";
import GoBack from "../components/GoBack";
import { createCookie, deleteCookie } from "@/shared/lib/cookies";

export default function CheckPage() {
  const [email, setEmail] = useState<string | undefined>();
  const [code, setCode] = useState<string>("");
  const [errors, setErrors] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const emailCheck = document.cookie
      .split("; ")
      .find((row) => row.startsWith("email-check="))
      ?.split("=")[1];

    setEmail(emailCheck);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/check", {
      method: "POST",
      body: JSON.stringify({ email, code }),
    });

    if (res.status === 200) {
      const { token } = await res.json();
      deleteCookie("email-check");
      createCookie("auth-token", token);
      router.push("/");
    } else if (res.status === 400) {
      const { errors } = await res.json();
      setTimeout(() => {
        setErrors(errors);
        setLoading(false);
      }, 200);
    } else {
      deleteCookie("email-check");
      router.push("/auth/login");
    }
  }

  return (
    <AuthContainer>
      <GoBack email={email}>Go Back</GoBack>
      <AuthForm action={handleSubmit}>
        <Logo />
        <Title>Check your Email</Title>
        <TextInput placeholder="Enter your code" id="Code" action={setCode} />
        <ErrorText
          location={"Code"}
          errors={[{ location: "Code", msg: errors }]}
        />
        <SubmitBtn disabled={loading}>
          {loading ? "Checking..." : "Check Email"}
        </SubmitBtn>
      </AuthForm>
    </AuthContainer>
  );
}
