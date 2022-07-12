import React, { useEffect, useState } from "react";
import { requests, key, tvSeriesRequests } from "../Requests";
import Row from "../components/Row";
import axios from "axios";
import MovieInfo from "../components/MovieInfo";

const TVSeries = () => {
  const [showModal, setShowModal] = useState(undefined);
  const castsRequest = `https://api.themoviedb.org/3/tv/${showModal?.id}/credits?api_key=${key}&language=en-US`;
  const trailerRequest = `https://api.themoviedb.org/3/tv/${showModal?.id}/videos?api_key=${key}&language=en-US`;
  const similarMoviesRequest = `https://api.themoviedb.org/3/tv/${showModal?.id}/similar?api_key=${key}&language=en-US&page=1`;

  const [movies, setMovies] = useState([]);

  //Select movie in random so main page displays a different popular movie everytime the page loads
  const randomTVSeries = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(tvSeriesRequests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  console.log(randomTVSeries);

  return (
    <>
      <div className="w-full h-[550px] text-white flex justify-center items-center">
        <div className="w-full h-full">
          <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
          <img
            src={`https://image.tmdb.org/t/p/original/${randomTVSeries?.backdrop_path}`}
            alt={randomTVSeries?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute w-full p-4 md:pd-8">
          <h1 className="text-3xl md:text-5xl font-bold">
            {randomTVSeries?.name}
          </h1>
          <div>
            <button
              type="button"
              onClick={() => setShowModal(randomTVSeries)}
              className="my-4 border text-white py-2 px-4 rounded-3xl border-blue-600 bg-blue-600 shadow-lg"
            >
              Watch trailer
            </button>
            <button className="my-2 border text-white py-2 px-4 rounded-3xl ml-4">
              More info
            </button>
            <p className="my-2 text-gray-400 text-sm">
              Released: {randomTVSeries?.first_air_date}
            </p>
            <p className="sm:w-[85%] sm:text-xs md:text-base lg:text-lg md:w-[65%] lg:w-[50%]">
              {randomTVSeries?.overview}
            </p>
          </div>
        </div>
      </div>
      {showModal !== undefined ? (
        <MovieInfo
          setShowModal={setShowModal}
          showModal={showModal}
          fetchCastsURL={castsRequest}
          fetchTrailerURL={trailerRequest}
          fetchSimilarMoviesURL={similarMoviesRequest}
        />
      ) : null}
      <Row
        setShowModal={setShowModal}
        rowID="1"
        title="Popular"
        fetchURL={tvSeriesRequests.requestPopular}
      />
      <Row
        setShowModal={setShowModal}
        rowID="2"
        title="Top Rated TV Series"
        fetchURL={tvSeriesRequests.requestTopRated}
      />
      <Row
        setShowModal={setShowModal}
        rowID="3"
        title="Ongoing"
        fetchURL={tvSeriesRequests.requestOnGoing}
      />
    </>
  );
};

export default TVSeries;
