import React, { useState } from "react";
import { PlayIcon } from "../assets/Icons/Icons";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Movie = ({ item }) => {
  const [like, setLike] = useState(false);
  return (
    <div /*  */>
      <div
        className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[200px] p-2"
        /* className="flex w-full h-full cursor-pointer" */
      >
        <img
          className="rounded-2xl cursor-pointer"
          src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
          alt={item?.title}
        />
        <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 rounded-2xl cursor-pointer">
          <PlayIcon />
          <div>
            {like ? (
              <FaHeart className="absolute top-4 left-4 text-gray-400" />
            ) : (
              <FaRegHeart className="absolute top-4 left-4 text-gray-400" />
            )}
          </div>
        </div>
      </div>
      <div>
        <p className="text-white text-center mt-4">{item?.title}</p>
      </div>
    </div>
  );
};

export default Movie;
