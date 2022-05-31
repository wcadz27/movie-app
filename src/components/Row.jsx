import axios from "axios";
import React, { useEffect, useState } from "react";
import { PlayIcon } from "../assets/Icons/Icons";
import requests from "../Requests";

const Row = ({ title, fetchURL }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

  console.log(movies);

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="flex relative items-center">
        <div id={"slider"}>
          {movies.map((item, id) => (
            <div className="relative inline-block w-[160px] sm:w-[200px] md:w-[240px] lg:w-[200px] cursor-pointer p-2">
              <img
                className="w-full h-auto block rounded-2xl"
                src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
                alt={item?.title}
              />
              <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 rounded-2xl">
                <PlayIcon />
              </div>
              <div>
                <p className="text-white text-center">{item?.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Row;
