import SendMessageForm from "./SendMessageForm";
import UserInfo from "./UserInfo";
import GoChats from "./GoChats";
import Messages from "./Messages";

export default function Home() {
  return (
    <>
      <header className="fixed top-0 w-full h-16 flex items-center backdrop:blur-sm bg-[#212121]">
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
