import Link from "next/link";

export default function ForgotPassword() {
  return (
    <Link
      href="forgot-password"
      className="font-semibold self-start mb-1"
    >
      Forgot your password?
    </Link>
  );
}
