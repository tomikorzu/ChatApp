import { Link } from "react-router-dom";

export default function GoChats() {
  return (
    <Link to={"/dashboard"} className="text-2xl mx-2 p-2">
      <i className="fa-solid fa-angle-left"></i>
    </Link>
  );
}
