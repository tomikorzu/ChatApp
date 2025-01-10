import { Eye, EyeOff } from "lucide-react";

export default function EyePassword({
  action,
  variable,
}: {
  action: (value: boolean) => void;
  variable: boolean;
}) {
  return (
    <button
      onClick={() => action(!variable)}
      type="button"
      className="absolute right-0 text-slate-100 hover:text-[#25c2a0] text-sm p-2 transition duration-200"
    >
      {!variable ? <Eye /> : <EyeOff />}
    </button>
  );
}
