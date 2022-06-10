import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute flex p-4 w-full items-center z-[48]">
      {/* Play icon goes in this line */}
      <Link to="/">
        <h1 className="text-blue-600 text-4xl font-bold cursor-pointer">
          wMovies
        </h1>
      </Link>
      <ul className="flex items-center ml-6">
        <li className="text-white cursor-pointer">Home</li>
        <li className="text-white cursor-pointer ml-2 mr-2">Movies</li>
        <li className="text-white cursor-pointer">TV Series</li>
      </ul>
      {user?.email ? (
        <div className="ml-auto">
          <Link to="/account">
            <button className="text-white cursor-pointer mr-2">Account</button>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-blue-600 px-4 py-2 cursor-pointer rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="ml-auto">
          <Link to="/signin">
            <button className="text-white cursor-pointer mr-2">Sign In</button>
          </Link>
          <Link to="/signup">
            <button className="bg-blue-600 px-4 py-2 cursor-pointer rounded">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
