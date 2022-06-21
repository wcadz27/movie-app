import axios from "axios";
import React, { useEffect, useState } from "react";

const MovieInfo = ({ setShowModal, showModal, fetchCastsURL }) => {
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    axios.get(fetchCastsURL).then((response) => {
      setCasts(response.data.cast);
    });
  }, [fetchCastsURL]);

  console.log(casts);

  return (
    <>
      <div className="fixed z-50 inset-0 md:my-5 flex flex-col bg-black h-full md:h-auto md:w-[95%] mx-auto overflow-x-hidden overflow-y-auto outline-none">
        <div className="h-full w-full">
          <div className="relative w-full h-[25%] md:h-[600px] text-white flex">
            <div className="w-full h-full overflow-hidden">
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
          <div className="absolute flex w-[80%]">
            <div className="flex">
              <div className="hidden md:block h-auto w-[65%]">
                <img
                  className="w-full h-auto object-cover"
                  src={`https://image.tmdb.org/t/p/original//7qop80YfuO0BwJa1uXk1DXUUEwv.jpg`}
                  alt=""
                />
              </div>
              <div className="text-white ml-5 mt-[-3rem] w-full">
                <h1 className="text-4xl font-bold">{showModal.title}</h1>
                <ul className="mt-1 text-[0.5rem]">
                  <li className="border-2 inline rounded-xl px-2">Comedy</li>
                </ul>
                <p className="text-[0.25em] mt-2 mr-3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Veritatis est suscipit at dolore exercitationem? A ipsam
                  itaque, accusantium explicabo ad veritatis quasi!
                  Necessitatibus deserunt reiciendis similique! Quia molestiae
                  minus nihil!
                </p>
                <div className="mt-3">
                  <h2 className="text-[0.7rem] font-semibold">Casts</h2>
                  <ul>
                    <li className="text-[0.7rem] font-semibold">Actor</li>
                  </ul>
                </div>
                <div className="text-white">
                  <div>
                    <h3 className="text-[0.7rem] font-semibold">Trailer</h3>
                    <div></div>
                  </div>
                  <div>
                    <h3 className="text-[0.7rem] font-semibold">
                      Similar shows
                    </h3>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block fixed opacity-50  inset-0 z-40 bg-black"></div>
    </>
  );
};

export default MovieInfo;
