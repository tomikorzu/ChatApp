import GoChats from "./components/GoChats";
import Messages from "./components/Messages";
import SendMessageForm from "./components/SendMessageForm";
import UserInfo from "./components/UserInfo";

export default function ChatPage() {
  return (
    <>
      <header className="fixed z-20 top-0 w-full h-16 flex items-center backdrop:blur-sm bg-[#212121]">
        <GoChats />
        <UserInfo />
      </header>
      <main className="h-screen flex justify-center items-center overflow-hidden">
        <Messages />
        <SendMessageForm />
      </main>
    </>
  );
}
