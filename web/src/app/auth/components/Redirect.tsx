import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Redirect({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      {url !== "back" ? (
        <Link
          className="absolute flex justify-center font-semibold items-center gap-1 right-6 top-5 px-4 py-2 rounded-full bg-[#27947c] lg:hover:brightness-110 transition duration-[.4s]"
          href={url}
        >
          {children}
          <ArrowRight className="size-5" />
        </Link>
      ) : (
        <button
          className="absolute flex justify-center font-semibold items-center gap-1 left-6 top-5 px-4 py-2 rounded-full bg-[#27947c] lg:hover:brightness-110 transition duration-[.4s]"
          onClick={() => router.back()}
        >
          <ArrowLeft className="size-5" />
          {children}
        </button>
      )}
    </>
  );
}
