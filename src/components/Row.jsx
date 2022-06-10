import axios from "axios";
import React, { useEffect, useState } from "react";
import requests from "../Requests";
import Movie from "./Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Row = ({ title, fetchURL, rowID }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

  const slideLeft = () => {
    var slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft - 500;
    console.log(slider);
  };

  const slideRight = () => {
    var slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div
        className="relative ml-8 group"
        /* className="flex" */
        /* className="flex relative items-center overflow-x-scroll scroll-smooth scrollbar scrollbar-hide group" */
      >
        <MdChevronLeft
          onClick={slideLeft}
          size={40}
          className="bg-white rounded-full top-[130px] absolute opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block hidden md:top-[155px]"
        />
        <div
          id={"slider" + rowID}
          className="relative flex w-full flex-nowrap overflow-x-scroll scroll-smooth scrollbar-hide"
        >
          {movies.map((item, id) => (
            <Movie key={id} item={item} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          size={40}
          className="bg-white rounded-full absolute top-[130px] right-0 opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block hidden md:top-[155px]"
        />
      </div>
    </>
  );
};

export default Row;
