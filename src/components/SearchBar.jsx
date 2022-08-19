import React, { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";

const SearchBar = () => {
  const queryRef = useRef(null);

  const [searchInput, setSearchInput] = useState("");
  const [showSearch, setShowSearch] = useState([]);

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
  return (
    <div className="flex flex-col text-white font-semibold bg-gray-800 w-[90vw] rounded-lg">
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
          onChange={(event) => getMovies(event.target.value.toLowerCase())}
          ref={queryRef}
          value={searchInput}
        />
      </form>
      <ul
        className={`absolute ${
          searchInput ? "block" : "hidden"
        } h-[470px] w-[350px] bg-gray-600 mt-[10%] sm:mt-[5%] text-white overflow-y-scroll overflow-hidden gap-y-3 flex flex-col scroll-smooth`}
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
