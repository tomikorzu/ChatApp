export default function UserInfo() {
  const data = {
    image: "/me.jpeg",
    name: "amor",
    state: "Online",
  };

  return (
    <div className="flex gap-2 items-center justify-start bg-[#212121]">
      <img
        src={data.image}
        alt={`${data.name} User Image`}
        className="size-9 object-cover rounded-full"
      />
      <div className="flex flex-col">
        <h3 className="font-bold max-w-[170px] text-sm whitespace-nowrap text-ellipsis overflow-hidden">
          {data.name}
        </h3>
        <span className="text-[10px]">{data.state}</span>
      </div>
    </div>
  );
}
