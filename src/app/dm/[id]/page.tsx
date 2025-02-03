import GoChats from "./components/GoChats";
import Messages from "./components/Messages";
import SendMessageForm from "./components/SendMessageForm";
import UserInfo from "./components/UserInfo";

export default function ChatPage() {
  return (
    <div className="w-full h-screen flex flex-col">
      <header className="w-full h-16 flex items-center backdrop:blur-sm bg-[#212121]">
        <GoChats />
        <UserInfo />
      </header>
      <main className="h-screen w-full flex justify-center items-center overflow-hidden relative">
        <Messages />
        <SendMessageForm />
      </main>
    </div>
  );
}
