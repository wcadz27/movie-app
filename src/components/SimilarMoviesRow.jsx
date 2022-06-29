import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import SimilarMovie from "./SimilarMovie";

const SimilarMoviesRow = ({ fetchSimilarMoviesURL, setShowModal, movie }) => {
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
    axios.get(fetchSimilarMoviesURL).then((res) => {
      setSimilarMovies(res.data.results);
    });
  }, [fetchSimilarMoviesURL]);

  return (
    <>
      <MdChevronLeft
        onClick={slideLeft}
        size={40}
        className="bg-white top-[30%] rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block hidden"
      />
      <div className="overflow-x-scroll scrollbar-hide h-auto w-[100vw] flex gap-x-10">
        {similarMovies.map((movie, id) => (
          <SimilarMovie setShowModal={setShowModal} key={id} movie={movie} />
        ))}
      </div>
      <MdChevronRight
        onClick={slideRight}
        size={40}
        className="bg-white top-[30%] rounded-full absolute right-0 opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block hidden"
      />
    </>
  );
};
export default SimilarMoviesRow;
