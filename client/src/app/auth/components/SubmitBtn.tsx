export default function SubmitBtn({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="bg-[#27947c] mt-2 font-bold py-2 w-full rounded-lg transition duration-[.4s] lg:hover:brightness-110"
    >
      {children}
    </button>
  );
}
