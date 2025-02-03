import Link from "next/link";

export default function Button({
  pathname,
  url,
  icon,
}: {
  pathname: string;
  url: string;
  icon: string;
}) {
  const condition = (url: string, pathname: string) => {
    if (url !== "/" && pathname.includes(url)) {
      return "text-[#fff] bg-[#444]";
    } else {
      if (pathname === url && url === "/") {
        return "text-[#fff] bg-[#444]";
      } else {
        return "text-[#b2b2b2] lg:hover:bg-[#ffffff10]";
      }
    }
  };
  return (
    <Link
      href={url}
      className={`${condition(
        url,
        pathname
      )} rounded-lg size-12 transition duration-[.4s] flex items-center justify-center text-xl`}
    >
      <i className={icon}></i>
    </Link>
  );
}
