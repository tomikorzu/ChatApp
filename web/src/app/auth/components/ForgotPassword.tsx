import Link from "next/link";

export default function ForgotPassword() {
  return (
    <Link
      href="forgot-password"
      className="font-semibold self-start"
    >
      Forgot your password?
    </Link>
  );
}
