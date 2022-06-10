import axios from "axios";
import React, { useEffect, useState } from "react";
import requests from "../Requests";

const Main = () => {
  const [movies, setMovies] = useState([]);

  //Select movie in random so main page displays a different popular movie everytime the page loads
  const randomPopularMovie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  console.log(randomPopularMovie);

  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
        <img
          src={`https://image.tmdb.org/t/p/original/${randomPopularMovie?.backdrop_path}`}
          alt={randomPopularMovie?.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute w-full top-[25%] p-4 md:pd-8">
        <h1 className="text-3xl md:text-5xl font-bold">
          {randomPopularMovie?.title}
        </h1>
        <div>
          <button className="my-4 border text-white py-2 px-4 rounded-3xl border-blue-600 bg-blue-600 shadow-lg">
            Watch now
          </button>
          <button className="my-2 border text-white py-2 px-4 rounded-3xl ml-4">
            Watch trailer
          </button>
          <p className="my-2 text-gray-400 text-sm">
            Released: {randomPopularMovie?.release_date}
          </p>
          <p className="w-[40rem] lg:w-[50rem]">
            {randomPopularMovie?.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
