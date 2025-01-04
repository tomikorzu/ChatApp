export default function Message({ message }: { message: string }) {
    
  return (
    <li className="p-3 text-sm rounded-xl bg-[#333] ">{message}</li>
  );
}
