export default function TextInput({
  action,
  placeholder,
}: {
  action: (e: string) => void;
  placeholder: string;
}) {
  return (
    <input
      className="text-slate-100 placeholder:text-[#ffffff80] p-2.5 my-2 rounded-md text-sm w-full bg-[#373636] border border-[#ffffff80] focus:border-[#25c2a0] transition duration-500"
      type="text"
      placeholder={placeholder}
      onChange={(e) => action(e.target.value as string)}
    />
  );
}
