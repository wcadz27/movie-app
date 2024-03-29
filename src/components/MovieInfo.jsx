import axios from "axios";
import React, { useEffect, useState } from "react";
import Player from "./Player";
import SimilarMoviesRow from "./SimilarMoviesRow";
import { mergedGenres } from "../genres";
import { showInfo } from "../Requests";

const MovieInfo = ({ setShowModal, showModal, showType, setShowType }) => {
  const [casts, setCasts] = useState([]);
  const [trailer, setTrailer] = useState([]);

  const modalShowInfo = showInfo(showModal?.id, showType);

  const filteredGenre = mergedGenres.filter((element) =>
    showModal?.genre_ids.includes(element.id)
  );

  console.log(modalShowInfo);
  console.log(showType);

  useEffect(() => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const fetchURLs = async () => {
      await sleep(4000);
      try {
        await axios.get(modalShowInfo[0]).then((response) => {
          setCasts(response.data.cast);
        });
        await axios.get(modalShowInfo[1]).then((response) => {
          setTrailer(
            response.data.results.filter((el) => {
              return el.type === "Trailer";
            })
          );
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchURLs();
  }, []);

  console.log(casts);

  return (
    <>
      <div className="fixed z-50 inset-0 md:my-5 w-full h-auto md:w-[95%] overflow-y-auto overflow-x-hidden scrollbar-hide outline-none focus:outline-none mx-auto bg-black">
        <div className="w-full h-auto md:h-[600px] 2xl:h-[700px] 3xl:h-[1100px] text-white flex">
          <div className="w-full h-full">
            <div className="absolute w-full h-[500px] md:h-[600px] 2xl:h-[1100px] bg-gradient-to-t from-black ">
              <button
                className="absolute top-0 right-0 text-white bg-blue-600 px-2 rounded-md mr-4 mt-4 text-[0.6rem] 3xl:text-[2rem]"
                onClick={() => {
                  setShowModal(undefined);
                  setShowType("");
                }}
              >
                Close
              </button>
            </div>
            <img
              src={`https://image.tmdb.org/t/p/original//${showModal?.backdrop_path}`}
              alt={showModal?.title || showModal?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="absolute flex flex-col w-full ml-2 text-white top-[11rem] h-auto pb-3">
          <div className="w-full h-full md:ml-[20%] lg:ml-[25%] md:mt-[-5%] 2xl:mt-[-1%] 3xl:ml-[30%] md:flex">
            <div className="hidden md:block w-[20%] max-w-[270px] 3xl:max-w-[400px]">
              <img
                className="w-full h-auto object-cover"
                src={`https://image.tmdb.org/t/p/original//${showModal?.poster_path}`}
                alt=""
              />
            </div>
            <div className="ml-5 relative flex flex-col md:justify-center">
              <h1 className="text-4xl font-bold bottom-[20%] w-[50%] 3xl:w-full 3xl:mb-[2rem] 3xl:text-[4rem]">
                {showModal?.title || showModal?.name}
              </h1>
              <ul className="flex mt-1 text-[0.5rem] 2xl:text-[0.85rem] 3xl:text-[1.5em] gap-2">
                {filteredGenre.map((genre) => (
                  <li className="border-2 2xl:border-4 inline rounded-xl px-2">
                    {genre.name}
                  </li>
                ))}
                {console.log(showModal)}
              </ul>
              <p className="text-[0.25em] md:text-[0.5em] xl:text-[0.6em] 2xl:text-[0.85em] 3xl:text-[1.5em] mt-2 mr-3 w-[40%] md:w-[40%]">
                {showModal?.overview ||
                  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto, hic perspiciatis? Doloremque ipsum obcaecati veniam laboriosam excepturi laudantium error porro, alias mollitia fugit corporis magnam ducimus animi doloribus. Doloremque, exercitationem."}
              </p>
            </div>
          </div>

          <div className="mt-[15%] md:mb-[2rem] w-[90vw]">
            <h2 className="text-[0.7rem] md:text-[1.3em] 3xl:text-[2.5em] font-semibold mb-3">
              Casts
            </h2>
            <ul className="w-full md:overflow-x-auto md:scrollbar-hide h-full flex flex-wrap md:flex-nowrap gap-y-5">
              {casts.slice(0, 7).map((cast, id) => (
                <li key={id}>
                  <div className="w-[5em] md:w-[12em] 3xl:w-[17em] h-[120px] md:h-auto flex flex-col items-center">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${cast?.profile_path}`}
                      alt={cast?.name}
                      className="h-auto w-[4em] md:w-[10em] 3xl:w-[15em]"
                    />
                    <p className="inline-block text-[0.4em] md:text-[1em] text-center mt-2">
                      {cast?.name}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full flex flex-col h-auto items-center">
            <h3 className="self-start text-[0.7rem] md:text-[1.3em] 3xl:text-[2.5em] font-semibold mb-3 text-white">
              Trailer
            </h3>
            <div className="my-4 w-full md:max-w-[85vw] 2xl:max-w-[60vw] h-auto">
              <Player trailer={trailer} />
            </div>
          </div>
          <SimilarMoviesRow
            fetchSimilarMoviesURL={modalShowInfo[2]}
            setShowModal={setShowModal}
          />
        </div>
      </div>

      <div className="hidden md:block fixed opacity-50  inset-0 z-40 bg-black"></div>
    </>
  );
};

export default MovieInfo;
