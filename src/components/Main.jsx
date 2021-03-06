import React from "react";

const Main = ({ setShowModal, randomPopularMovie }) => {
  console.log(randomPopularMovie);

  return (
    <div className="w-full h-[550px] text-white flex justify-center items-center">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
        <img
          src={`https://image.tmdb.org/t/p/original/${randomPopularMovie?.backdrop_path}`}
          alt={randomPopularMovie?.title || randomPopularMovie?.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute w-full p-4 md:pd-8">
        <h1 className="text-3xl md:text-5xl font-bold">
          {randomPopularMovie?.title || randomPopularMovie?.name}
        </h1>
        <div>
          <button
            type="button"
            onClick={() => setShowModal(randomPopularMovie)}
            className="my-4 border text-white py-2 px-4 rounded-3xl border-blue-600 bg-blue-600 shadow-lg"
          >
            Watch trailer
          </button>
          <button className="my-2 border text-white py-2 px-4 rounded-3xl ml-4">
            More info
          </button>
          <p className="my-2 text-gray-400 text-sm">
            Released:{" "}
            {randomPopularMovie?.release_date ||
              randomPopularMovie?.first_air_date}
          </p>
          <p className="sm:w-[85%] sm:text-xs md:text-base lg:text-lg md:w-[65%] lg:w-[50%]">
            {randomPopularMovie?.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
