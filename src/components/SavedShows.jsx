import React, { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { PlayIcon } from "../assets/Icons/Icons";
import { AiOutlineClose } from "react-icons/ai";

const SavedShows = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

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
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);

  return (
    <div
      className="relative ml-8 group"
      /* className="flex" */
      /* className="flex relative items-center overflow-x-scroll scroll-smooth scrollbar scrollbar-hide group" */
    >
      <MdChevronLeft
        onClick={slideLeft}
        size={40}
        className="bg-white rounded-full top-[130px] absolute opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block hidden md:top-[50px]"
      />
      <div
        id={"slider"}
        className="relative flex w-full flex-nowrap overflow-x-scroll scroll-smooth scrollbar-hide"
      >
        {movies.map((item, id) => (
          <div
            className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[200px] p-2"
            /* className="flex w-full h-full cursor-pointer" */
          >
            <img
              className="rounded-2xl cursor-pointer"
              src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
              alt={item?.title}
            />
            <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 rounded-2xl cursor-pointer">
              <PlayIcon />
            </div>
            <div>
              <AiOutlineClose className="" />
            </div>
          </div>
        ))}
      </div>
      <MdChevronRight
        onClick={slideRight}
        size={40}
        className="bg-white rounded-full absolute top-[130px] right-0 opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block hidden md:top-[50px]"
      />
    </div>
  );
};

export default SavedShows;
