import React from "react";

const Navbar = () => {
  return (
    <div className="py-4 px-5 bg-gradient-to-b from-gray-900 to-black text-white justify-between flex items-center max-w-full mx-auto shadow-lg ">
      <div className="text-center">
        <h3 className="text-[22px] text-white font-extrabold tracking-wider ">
        NovaLink
        </h3>
      </div>
      <div className="text-center">
        <ul className="flex gap-8 justify-center">
          <li className="font-semibold text-gray-200 hover:text-blue-400 transform hover:scale-110 transition-all">
            <a href="/">Home</a>
          </li>
          <li className="font-semibold text-gray-200 hover:text-blue-400 transform hover:scale-110 transition-all">
            <a href="/about">About</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
