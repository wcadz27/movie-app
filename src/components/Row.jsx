import axios from "axios";
import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Row = ({
  title,
  fetchURL,
  rowID,
  setShowModal,
  setShowType,
  isTVSeries,
}) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const fetchShows = async () => {
      await sleep(2000 * rowID);
      try {
        axios.get(fetchURL).then((response) => {
          setMovies(response.data.results);
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchShows();
  }, [fetchURL]);

  console.log(movies);

  const slideLeft = () => {
    var slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl 2xl:text-3xl p-4">
        {title}
      </h2>
      <div
        className="relative group w-full h-auto"
        /* className="flex" */
        /* className="flex relative items-center overflow-x-scroll scroll-smooth scrollbar scrollbar-hide group" */
      >
        <MdChevronLeft
          onClick={slideLeft}
          size={40}
          className="bg-white top-[35%] rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block hidden"
        />
        <div
          id={"slider" + rowID}
          className="relative flex w-full h-auto overflow-x-scroll scroll-smooth scrollbar-hide"
        >
          {movies.map((item, id) => (
            <Movie
              isTVSeries={isTVSeries}
              setShowType={setShowType}
              setShowModal={setShowModal}
              key={id}
              item={item}
            />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          size={40}
          className="bg-white top-[35%] rounded-full absolute right-0 opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block hidden"
        />
      </div>
    </>
  );
};

export default Row;
