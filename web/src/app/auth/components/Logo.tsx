import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src={"/socketio.svg"}
      alt="Socket.io logo"
      width={80}
      height={80}
      className="my-2"
    />
  );
}
