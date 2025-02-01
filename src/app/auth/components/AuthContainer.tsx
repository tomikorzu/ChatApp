export default function AuthContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-screen w-full max-w-6xl mx-auto flex gap-2 items-center justify-center flex-wrap">
      {children}
    </div>
  );
}
