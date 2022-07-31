import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";
import MovieInfo from "../components/MovieInfo";
import { key } from "../Requests";

const Results = () => {
  const { input } = useParams();
  const [showResults, setShowResults] = useState([]);
  const [showModal, setShowModal] = useState(undefined);

  const castsRequest = `https://api.themoviedb.org/3/movie/${showModal?.id}/credits?api_key=${key}&language=en-US`;
  const trailerRequest = `https://api.themoviedb.org/3/movie/${showModal?.id}/videos?api_key=${key}&language=en-US`;
  const similarMoviesRequest = `https://api.themoviedb.org/3/movie/${showModal?.id}/similar?api_key=${key}&language=en-US&page=1`;

  useEffect(() => {
    const getMovies = async () => {
      await axios
        .get(
          "https://api.themoviedb.org/3/search/movie?api_key=d80a54a0422d5fff6149c48741c8bece&language=en-US&query=" +
            input
        )
        .then((res) => {
          setShowResults(res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getMovies();
  }, []);

  return (
    <>
      <div className="relative text-white text-2xl w-full h-full pt-[170px]">
        <h1 className="font-bold text-4xl mb-8 bg-blue-500 inline-block p-2 rounded-md">
          Search results for "{input}"
        </h1>
        <div className="flex gap-x-[1.7em] gap-y-[0.35em] flex-wrap">
          {showResults.map((show, index) => (
            <div className="w-[250px] h-[500px]">
              <Movie setShowModal={setShowModal} key={index} item={show} />
            </div>
          ))}
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
    </>
  );
};

export default Results;
