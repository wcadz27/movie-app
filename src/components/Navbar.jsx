import React from "react";

const Navbar = () => {
  return (
    <div className="flex p-4 w-full absolute items-center z-[100]">
      {/* Play icon goes in this line */}
      <h1 className="text-blue-600 text-4xl font-bold cursor-pointer">
        wMovies
      </h1>
      <ul className="flex items-center ml-6">
        <li className="text-white cursor-pointer">Home</li>
        <li className="text-white cursor-pointer ml-2 mr-2">Movies</li>
        <li className="text-white cursor-pointer">TV Series</li>
      </ul>
      <div className="ml-auto">
        <button className="text-white cursor-pointer mr-2">Sign In</button>
        <button className="bg-blue-600 px-4 py-2 cursor-pointer rounded">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Navbar;
