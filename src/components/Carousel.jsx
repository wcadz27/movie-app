import axios from "axios";
import React, { useEffect, useState } from "react";
import { requests } from "../Requests";

const Carousel = () => {
  const [movies, setMovies] = useState([]);

  const [current, setCurrent] = useState(0);
  const length = movies.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const jumpToSlide = (num) => {
    setCurrent(current === num ? current : num);
  };

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results.slice(0, 5));
    });
  }, []);

  if (!Array.isArray(movies) || movies.length <= 0) {
    return null;
  }

  console.log(movies);

  return (
    <div className="relative flex h-[450px] w-full bg-white">
      <div className="flex absolute justify-center bottom-0 w-full mb-4 gap-3 z-10">
        {movies.map((movie, index) => (
          <button
            key={index}
            type="button"
            onClick={() => jumpToSlide(index)}
            className={`${
              index === current ? "active duration-500 bg-gray-400" : ""
            }  duration-500 bg-gray-300 ease-in-out z-10`}
          >
            Slide {index + 1}
          </button>
        ))}
      </div>
      <div className="flex absolute h-full w-full items-center justify-between">
        <button type="button" className="bg-blue-500 z-10 " onClick={prevSlide}>
          Left
        </button>
        <button type="button" className="bg-blue-500 z-10 " onClick={nextSlide}>
          Right
        </button>
      </div>
      {movies.map((movie, index) => (
        <div
          key={index}
          className={`${
            index === current
              ? "active duration-1000 opacity-100 scale-[1.08]"
              : "opacity-0"
          }  duration-1000 absolute ease-in-out z-5 h-full w-full`}
        >
          {index === current && (
            <img
              className="h-full w-full object-cover"
              alt={`${movie?.title}`}
              src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
            />
          )}
          {console.log(movie)}
        </div>
      ))}
    </div>
  );
};

export default Carousel;
