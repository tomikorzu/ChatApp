import { useEffect, useState } from "react";

export default function DotsWord({ text }: { text: string }) {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev: number) => {
        if (prev === 3) return 1;
        return prev + 1;
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  const dots = ".".repeat(time);

  return (
    <span className="flex items-center">
      {text}
      <span className="ml-1">{dots}</span>
    </span>
  );
}
