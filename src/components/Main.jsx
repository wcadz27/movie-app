import React, { useEffect, useState } from "react";
import { BsCircle, BsCircleFill } from "react-icons/bs";

const Main = ({ setShowModal, showsHero }) => {
  const delay = 5000;

  const [current, setCurrent] = useState(0);
  const length = showsHero.length;

  const jumpToSlide = (num) => {
    setCurrent(current === num ? current : num);
  };

  useEffect(() => {
    const timer = setTimeout(
      () => setCurrent(current === length - 1 ? 0 : current + 1),
      delay
    );
    return () => clearTimeout(timer);
  }, [current]);

  if (!Array.isArray(showsHero) || length <= 0) {
    return null;
  }

  return (
    <>
      <div className="relative w-full h-[550px] text-white flex overflow-hidden">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black z-10"></div>
        {showsHero.map((show, index) => (
          <div
            className={`${
              index === current ? "opacity-100" : "opacity-0 scale-[1.08]"
            } absolute w-full h-full flex flex-col justify-center z-10 ml-3 duration-1000 ease-in-out`}
          >
            <h1 className="text-xl xl:text-3xl md:text-5xl font-bold">
              {show?.title || show?.name}
            </h1>
            <div>
              <button
                type="button"
                onClick={() => setShowModal(show)}
                className="text-sm py-1 px-2 my-4 border text-white sm:py-2 sm:px-4 rounded-3xl border-blue-600 bg-blue-600 shadow-lg"
              >
                Watch trailer
              </button>
              <p className="my-2 text-gray-400 text-xs sm:text-sm">
                Released: {show?.release_date || show?.first_air_date}
              </p>
              <p className="sm:w-[85%] text-[0.75em] sm:text-xs md:text-base lg:text-lg md:w-[65%] lg:w-[50%]">
                {show?.overview ||
                  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto, hic perspiciatis? Doloremque ipsum obcaecati veniam laboriosam excepturi laudantium error porro, alias mollitia fugit corporis magnam ducimus animi doloribus. Doloremque, exercitationem."}
              </p>
            </div>
          </div>
        ))}
        <div className="flex absolute justify-center bottom-0 w-full mb-4 gap-3">
          {showsHero.map((show, index) => (
            <button
              key={index}
              type="button"
              onClick={() => jumpToSlide(index)}
              className={`${
                index === current ? "active duration-250 text-gray-500" : ""
              }  duration-250 text-white ease-in-out z-10`}
            >
              {index === current ? <BsCircleFill /> : <BsCircle />}
            </button>
          ))}
        </div>

        <div className="absolute h-[550px] w-full">
          {showsHero.map((movie, index) => (
            <div
              key={index}
              className={`${
                index === current
                  ? "active duration-1000 opacity-100 scale-[1.08] pb-[100%]"
                  : "opacity-0"
              } duration-1000 ease-in-out w-full text-white`}
            >
              {index === current && (
                <img
                  className="h-full w-full object-cover"
                  alt={`${movie?.title}`}
                  src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Main;
