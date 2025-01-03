import io from "socket.io-client";

const socket = io("/");

export default function Home() {
  return (
    <div>
      <form className="">
        <input type="text" placeholder="Enter your message" />
        <button type="submit" className="">
          Send
        </button>
      </form>
    </div>
  );
}
