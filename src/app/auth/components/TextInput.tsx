export default function TextInput({
  action,
  id,
  placeholder,
}: {
  action: (e: string) => void;
  id: string;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col w-full items-center relative">
      <label
        className="pointer-events-none absolute top-[-3px] left-[10px] bg-[#2f2f2f] text-[#e2e2e2] text-sm py-0 px-1 font-semibold"
        htmlFor={id}
      >
        {id}
      </label>
      <input
        className="text-slate-100 placeholder:text-[#ffffff80] autofill:bg-[#212121] autofill:text-slate-100 p-2.5 bg-transparent my-2 rounded-md text-sm w-full border border-[#ffffff80] focus:border-[#25c2a0] transition duration-500"
        type="text"
        id={id}
        placeholder={placeholder}
        onChange={(e) => action(e.target.value as string)}
      />
    </div>
  );
}
