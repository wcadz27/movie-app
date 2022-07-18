import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { BsChevronDown } from "react-icons/bs";
import { genres, filteredAllGenres } from "../genres";

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
    <div className="fixed flex p-4 w-full items-center z-[48] active:bg-black">
      {/* Play icon goes in this line */}
      <Link to="/">
        <h1 className="text-blue-600 text-4xl font-bold cursor-pointer">
          bbMovies
        </h1>
      </Link>
      <div className="group relative dropdown ml-5 md:hidden cursor-pointer tracking-wide text-white">
        <div className="flex items-center">
          <a>Browse</a>
          <span className="ml-3">
            <BsChevronDown />
          </span>
        </div>
        <div className="group-hover:block dropdown-menu absolute hidden h-auto bg-gray-800 rounded-md">
          <ul className="top-0 w-[8.25rem] flex flex-col text-left">
            <Link to="/">
              <li className="block pl-2 py-2 text-white cursor-pointer hover:bg-gray-400">
                Home
              </li>
            </Link>
            <li className="block pl-2 py-2 text-white cursor-pointer my-2 hover:bg-gray-400">
              <p>Genre</p>
              <div className=""></div>
            </li>
            <Link to="/movies">
              <li className="block pl-2 py-2 text-white cursor-pointer my-2 hover:bg-gray-400">
                Movies
              </li>
            </Link>
            <Link to="/tvseries">
              <li className="block pl-2 py-2 text-white cursor-pointer hover:bg-gray-400">
                TV Series
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <ul className="items-center ml-6 hidden md:flex">
        <Link to="/">
          <li className="text-white cursor-pointer">Home</li>
        </Link>
        <li className="flex flex-col text-white cursor-pointer ml-2 mr-2">
          <p className="peer">Genre</p>
          <div className="absolute hidden peer-hover:flex hover:flex w-[800px]">
            <ul className="justify-center w-[800px] bg-gray-800 mt-[1.75rem] py-[1.2em]">
              <div className="ml-[5%] w-[700px] flex flex-wrap">
                {filteredAllGenres.map((genre, id) => (
                  <Link
                    to={`/genre/${genre
                      .toLowerCase()
                      .replace(/\s/g, "")
                      .replace(/\W+/g, "-")}`}
                    className="basis-1/3 p-[1em] hover:bg-gray-900"
                    key={id}
                  >
                    <li>{genre}</li>
                  </Link>
                ))}
              </div>
            </ul>
          </div>
        </li>
        <Link to="/movies">
          <li className="text-white cursor-pointer mr-2">Movies</li>
        </Link>
        <Link to="/tvseries">
          <li className="text-white cursor-pointer">TV Series</li>
        </Link>
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
