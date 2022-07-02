import axios from "axios";
import React, { useEffect, useState } from "react";
import Player from "./Player";
import SimilarMoviesRow from "./SimilarMoviesRow";

const MovieInfo = ({
  setShowModal,
  showModal,
  fetchCastsURL,
  fetchTrailerURL,
  fetchSimilarMoviesURL,
}) => {
  const [casts, setCasts] = useState([]);
  const [trailer, setTrailer] = useState([]);

  useEffect(() => {
    axios.get(fetchCastsURL).then((response) => {
      setCasts(response.data.cast);
    });
    axios.get(fetchTrailerURL).then((response) => {
      setTrailer(
        response.data.results.filter((el) => {
          return el.type === "Trailer";
        })
      );
    });
  }, [fetchCastsURL, fetchTrailerURL]);

  console.log(trailer);

  return (
    <>
      <div className="fixed z-50 inset-0 md:my-5 w-full h-auto md:w-[95%] overflow-y-auto scrollbar-hide outline-none focus:outline-none mx-auto bg-black">
        <div className="w-full h-auto md:h-[600px] text-white flex">
          <div className="w-full h-full">
            <div className="absolute w-full h-full md:h-[600px] bg-gradient-to-t from-black ">
              <button
                className="absolute top-0 right-0 text-white bg-blue-600 mr-4 mt-4 text-[0.6rem]"
                onClick={() => setShowModal(undefined)}
              >
                Close
              </button>
            </div>
            <img
              src={`https://image.tmdb.org/t/p/original//${showModal?.backdrop_path}`}
              /*               alt={randomPopularMovie?.title} */
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="hidden absolute md:block w-[20%]">
          <img
            className="w-full h-auto object-cover"
            src={`https://image.tmdb.org/t/p/original//${showModal?.poster_path}`}
            alt=""
          />
        </div>

        <div className="absolute flex flex-col w-[95vw] ml-2 text-white top-[11rem] h-auto pb-3">
          <div className="w-full h-full md:ml-[15%] md:mt-[-5%] md:flex">
            <div className="hidden md:block w-[20%]">
              <img
                className="w-full h-auto object-cover"
                src={`https://image.tmdb.org/t/p/original//${showModal?.poster_path}`}
                alt=""
              />
            </div>
            <div className="ml-5">
              <h1 className="text-4xl font-bold bottom-[20%] w-[50%]">
                {showModal.title}
              </h1>
              <ul className="mt-1 text-[0.5rem]">
                <li className="border-2 inline rounded-xl px-2">Comedy</li>
              </ul>
              <p className="text-[0.25em] mt-2 mr-3 md:w-[40%]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Veritatis est suscipit at dolore exercitationem? A ipsam itaque,
                accusantium explicabo ad veritatis quasi! Necessitatibus
                deserunt reiciendis similique! Quia molestiae minus nihil!
              </p>
            </div>
          </div>

          <div className="mt-[4rem] relative">
            <h2 className="text-[0.7rem] font-semibold mb-3">Casts</h2>
            <ul className="w-full h-auto flex flex-wrap items-center gap-y-2">
              {casts.slice(0, 7).map((cast, id) => (
                <li key={id} className="">
                  <div className="w-[5em] h-[120px] flex flex-col items-center">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${cast?.profile_path}`}
                      alt={cast?.name}
                      className="h-auto w-[4em]"
                    />
                    <p className="inline-block text-[0.5rem] text-center mt-2">
                      {cast?.name}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="my-4 max-w-[640px] h-full">
            <h3 className="text-[0.7rem] font-semibold mb-3">Trailer</h3>
            <Player trailer={trailer} />
          </div>
          <SimilarMoviesRow
            fetchSimilarMoviesURL={fetchSimilarMoviesURL}
            setShowModal={setShowModal}
          />
        </div>
      </div>

      <div className="hidden md:block fixed opacity-50  inset-0 z-40 bg-black"></div>
    </>
  );
};

export default MovieInfo;
