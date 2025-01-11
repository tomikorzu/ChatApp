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

export default function RegisterPage() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errors, setErrors] = useState<string[]>([]);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    });

    if (res.status === 201) {
      router.push("/auth/check");
    } else if (res.status === 400) {
      const { errors } = await res.json();
      setErrors(errors);
    } else {
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
        {/* {errors.username[0] && <p>{errors.username[0]}</p>} */}
        <TextInput
          placeholder="Enter your email"
          id="Email"
          action={setEmail}
        />
        {/* {errors.email[0] && <p>{errors.email[0]}</p>} */}
        <PasswordInput
          placeholder="Enter your password"
          id="Password"
          action={setPassword}
        />
        {/* {errors.password[0] && <p>{errors.password[0]}</p>} */}
        <SubmitBtn>Sign Up</SubmitBtn>
      </AuthForm>
    </AuthContainer>
  );
}
