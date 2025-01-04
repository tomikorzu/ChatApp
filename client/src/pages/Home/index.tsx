import SendMessageForm from "./SendMessageForm";
import UserInfo from "./UserInfo";
import GoChats from "./GoChats"

export default function Home() {
  return (
    <>
      <header className="w-full h-16 flex items-center backdrop:blur-sm bg-[#212121]">
        <GoChats />
        <UserInfo />
      </header>
      <main className="h-screen flex justify-center items-center">
        <SendMessageForm />
      </main>
    </>
  );
}
