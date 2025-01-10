export default function AuthForm({
  action,
  children,
}: {
  action: (e: React.FormEvent) => void;
  children: React.ReactNode;
}) {
  return (
    <form
      onSubmit={action}
      className="flex flex-col px-5 py-6 rounded-lg bg-[#2f2f2f] text-center items-center w-full mx-5 max-w-sm"
    >
      {children}
    </form>
  );
}
