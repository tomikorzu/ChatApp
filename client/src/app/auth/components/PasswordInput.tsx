import { useState } from "react";
import EyePassword from "./EyePassword";

export default function PasswordInput({
  placeholder,
  id,
  action,
}: {
  placeholder: string;
  id: string;
  action: (e: string) => void;
}) {
  const [seePassword, setSeePassword] = useState<boolean>(false);

  return (
    <div className="flex flex-col w-full items-center mb-[5px] relative">
      <label
        className="capitalize pointer-events-none absolute top-[-3px] left-[10px] bg-[#2f2f2f] text-sm py-0 px-1 font-semibold"
        htmlFor={id}
      >
        {id}
      </label>
      <input
        className="text-slate-100 placeholder:text-[#ffffff80] p-2.5 my-2 rounded-md text-sm w-full bg-transparent border border-[#ffffff80] focus:border-[#25c2a0] transition duration-500 pr-11"
        type={seePassword ? "text" : "password"}
        id={id}
        placeholder={placeholder}
        onChange={(e) => action(e.target.value)}
      />
      <EyePassword action={setSeePassword} variable={seePassword} />
    </div>
  );
}
