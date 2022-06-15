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

  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteShow = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID);
      await updateDoc(movieRef, {
        savedShows: result,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="relative group w-full h-auto mt-8"
      /* className="flex" */
      /* className="flex relative items-center overflow-x-scroll scroll-smooth scrollbar scrollbar-hide group" */
    >
      <MdChevronLeft
        onClick={slideLeft}
        size={40}
        className="bg-white top-[30%] rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block hidden"
      />
      <div
        id={"slider"}
        className="relative flex w-full h-auto overflow-x-scroll scroll-smooth scrollbar-hide"
      >
        {movies.map((item) => (
          <div key={item.id} className="flex relative flex-col w-full h-auto">
            <div
              className="relative w-[300px] h-auto p-2"
              /* className="flex w-full h-full cursor-pointer" */
            >
              <img
                className="rounded-2xl cursor-pointer h-auto w-full"
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                alt={item?.title}
              />
              <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 rounded-2xl cursor-pointer">
                <PlayIcon />
                <div>
                  <AiOutlineClose
                    onClick={() => deleteShow(item.id)}
                    className="absolute text-gray-300 top-4 right-4"
                  />
                </div>
              </div>
            </div>
            <p className="text-white text-center mt-4">{item?.title}</p>
          </div>
        ))}
      </div>
      <MdChevronRight
        onClick={slideRight}
        size={40}
        className="bg-white top-[30%] rounded-full absolute right-0 opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block hidden"
      />
    </div>
  );
};

export default SavedShows;
