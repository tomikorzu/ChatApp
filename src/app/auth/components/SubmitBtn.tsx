export default function SubmitBtn({
  disabled,
  children,
}: {
  disabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      className={`bg-[#27947c] relative flex justify-center items-center mt-2 font-bold py-2 w-full rounded-lg transition duration-[.4s] lg:hover:brightness-110 ${
        disabled
          ? "cursor-not-allowed pointer-events-none opacity-80"
          : "cursor-pointer pointer-events-auto opacity-100"
      }`}
    >
      {children}
    </button>
  );
}
