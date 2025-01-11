export default function Title({ children }: { children: React.ReactNode }) {
  return <h1 className="text-2xl sm:text-3xl font-bold my-1 mb-3 flex items-center">{children}</h1>;
}
