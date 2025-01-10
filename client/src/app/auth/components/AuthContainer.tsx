export default function AuthContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-screen w-full max-w-6xl mx-auto flex items-center justify-center">
      {children}
    </div>
  );
}
