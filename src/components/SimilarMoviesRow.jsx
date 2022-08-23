import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import SimilarMovie from "./SimilarMovie";

const SimilarMoviesRow = ({ fetchSimilarMoviesURL, setShowModal }) => {
  const [similarMovies, setSimilarMovies] = useState([]);

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
    console.log(slider);
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  useEffect(() => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const fetchSimilarShows = async () => {
      await sleep(2000);
      try {
        await axios.get(fetchSimilarMoviesURL).then((res) => {
          setSimilarMovies(res.data.results);
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchSimilarShows();
  }, []);

  return (
    <>
      <h3 className="mb-3 text-[0.7rem] 3xl:text-[2.5em] font-semibold md:text-[1.3em]">
        Similar shows
      </h3>
      <div className="group w-full h-auto">
        <MdChevronLeft
          onClick={slideLeft}
          size={30}
          className="text-black bg-white bottom-[5.5%] rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block hidden"
        />
        <div
          id="slider"
          className="overflow-x-scroll scrollbar-hide h-auto w-full scroll-smooth flex gap-x-5"
        >
          {similarMovies.map((movie, id) => (
            <SimilarMovie setShowModal={setShowModal} key={id} movie={movie} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          size={30}
          className="right-0 text-black bg-white bottom-[5.5%] rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block hidden"
        />
      </div>
    </>
  );
};
export default SimilarMoviesRow;
