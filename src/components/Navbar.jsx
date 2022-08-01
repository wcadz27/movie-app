import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { BsChevronDown, BsSearch } from "react-icons/bs";
import { filteredAllGenres } from "../genres";
import axios from "axios";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [showSearch, setShowSearch] = useState([]);
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const queryRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getMovies = async (searchValue) => {
    let results = [];
    setSearchInput(searchValue);
    await axios
      .get(
        "https://api.themoviedb.org/3/search/movie?api_key=d80a54a0422d5fff6149c48741c8bece&language=en-US&query=" +
          searchValue
      )
      .then((res) => {
        results.push(...res.data.results.slice(0, 4));
      })
      .catch((err) => {
        console.log(err);
      });
    setShowSearch(results);
  };

  const [blurClass, setBlurClass] = useState("backdrop-blur-none");

  useEffect(() => {
    window.addEventListener("scroll", blurBGNavbar);

    return () => {
      window.removeEventListener("scroll", blurBGNavbar);
    };
  }, []);

  const blurBGNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 500
        ? setBlurClass("backdrop-blur-sm")
        : setBlurClass("backdrop-blur-none");
    }
  };

  const progressColour = (rating) => {
    if (rating < 2.5) {
      return `#ef4444`;
    } else if (rating < 6) {
      return `#eab308`;
    } else if (rating < 8) {
      return `#3b82f6`;
    } else {
      return `#22c55e`;
    }
  };

  console.log();

  return (
    <div className={`fixed ${blurClass} flex p-4 w-full items-center z-[48]`}>
      {/* Play icon goes in this line */}
      <Link to="/">
        <h1 className="text-blue-600 text-4xl 2xl:text-5xl font-extrabold cursor-pointer">
          MovieTime
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
            <li className="border-2 p-2 font-semibold block pl-2 py-2 text-white cursor-pointer hover:bg-gray-400">
              Search <BsSearch />
            </li>
          </ul>
        </div>
      </div>
      <ul className="items-center ml-6 hidden md:flex 2xl:text-xl">
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
          <li className="mr-3 text-white cursor-pointer">TV Series</li>
        </Link>
        <li className=" relative border-2 p-2 text-white font-semibold">
          <div className="flex flex-col relative">
            <form className="relative flex items-center w-full h-full">
              <Link
                to={{ pathname: "/search/" + searchInput }}
                className="cursor-pointer h-full flex absolute right-0 mr-2"
              >
                <button type="submit" onClick={() => setSearchInput(() => "")}>
                  <BsSearch />
                </button>
              </Link>
              <input
                className="ml-1 bg-transparent focus:outline-none"
                type="text"
                placeholder="Enter keywords.."
                onChange={(event) =>
                  getMovies(event.target.value.toLowerCase())
                }
                ref={queryRef}
                value={searchInput}
              />
            </form>
            <ul
              className={`absolute ${
                searchInput ? "block" : "hidden"
              } h-[470px] w-[400px] bg-gray-600 mt-[20%] ml-[-5%] text-white overflow-y-scroll overflow-hidden gap-y-3 flex flex-col scroll-smooth`}
            >
              {showSearch.map((show) => (
                <li className="w-full h-auto hover:border-y-2 hover:border-blue-600 hover:cursor-pointer">
                  <div className="flex w-full h-full">
                    <img
                      className="h-auto w-[150px]"
                      alt={`${show?.title}`}
                      src={`https://image.tmdb.org/t/p/original/${show?.poster_path}`}
                    />
                    <div className="w-full h-full flex flex-col items-center mt-[2rem] gap-2">
                      <h2>{show.title || show.name}</h2>
                      <p>Released: {show.release_date}</p>
                      <CircularProgressbar
                        className="w-[5rem] h-[5rem]"
                        value={show.vote_average}
                        maxValue={10}
                        text={`${show.vote_average * 10}%`}
                        styles={buildStyles({
                          pathColor: `${progressColour(show.vote_average)}`,
                          textColor: `${progressColour(show.vote_average)}`,
                        })}
                      />
                    </div>
                    <div></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </li>
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
        <div className="ml-auto 2xl:text-xl">
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
