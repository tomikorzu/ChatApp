import React, { useEffect, useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
  }, [search]);
  return (
    <div className="relative flex flex-col">
      <label className="absolute top-1/2 left-3 text-sm transform -translate-y-1/2 text-[#ffffff60] pointer-events-none">
        <i className="fas fa-search"></i>
      </label>
      <button
        className={`${
          inputValue.length > 0 ? "block" : "hidden"
        } absolute top-1/2 right-3 transform -translate-y-1/2`}
        onClick={() => setInputValue("")}
      >
        <label className="text-md text-[#ffffff90]">
          <i className="fas fa-times"></i>
        </label>
      </button>
      <input
        type="text"
        onChange={(e) => {
          const value = e.target.value;
          setSearch(value);
          setInputValue(value);
        }}
        value={inputValue}
        placeholder="Search"
        className="py-2 pl-7 pr-7 text-sm placeholder:text-[#ffffff60] mx-1 my-3 focus:border-[#c8c7c7] transition duration-[.4s] rounded-md bg-transparent border border-[#ffffff60]"
      />
    </div>
  );
}
