import React, { useState } from "react";
import { PlayIcon } from "../assets/Icons/Icons";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const SimilarMovie = ({ movie, setShowModal }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();
  const movieID = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    console.log(saveShow);
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: movie.id,
          title: movie.title,
          img: movie.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save a movie");
    }
  };

  return (
    <div className="relative inline-block">
      <img
        className="rounded-2xl h-auto min-w-[300px]"
        src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
        alt={movie.name}
      />
      <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 rounded-2xl cursor-pointer">
        <PlayIcon />
        <div onClick={() => saveShow()}>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-gray-400" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-400" />
          )}
        </div>
      </div>
    </div>
  );
};

export default SimilarMovie;
