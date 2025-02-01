import Link from "next/link";

export default function Button({
  pathname,
  name,
  url,
  icon,
}: {
  pathname: string;
  name: string;
  url: string;
  icon: string;
}) {
  return (
    <Link
      href={url}
      className={`${
        pathname === url ? "text-[#fff] bg-[#444] pointer-events-none" : "text-[#b2b2b2]"
      } rounded-lg size-12 lg:hover:bg-[#ffffff10] transition duration-[.4s] flex items-center justify-center text-xl`}
    >
      <i className={icon}></i>
    </Link>
  );
}
