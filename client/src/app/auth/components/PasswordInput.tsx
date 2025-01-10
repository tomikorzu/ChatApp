import { useState } from "react";
import EyePassword from "./EyePassword";

export default function PasswordInput({
  placeholder,
  action,
}: {
  placeholder: string;
  action: (e: string) => void;
}) {
  const [seePassword, setSeePassword] = useState<boolean>(false);

  return (
    <div className="relative flex items-center w-full">
      <input
        className="text-slate-100 placeholder:text-[#ffffff80] p-2.5 my-2 rounded-md text-sm w-full bg-[#373636] border border-[#ffffff80] focus:border-[#25c2a0] transition duration-500 pr-11"
        type={seePassword ? "text" : "password"}
        placeholder={placeholder}
        onChange={(e) => action(e.target.value)}
      />
      <EyePassword action={setSeePassword} variable={seePassword} />
    </div>
  );
}
