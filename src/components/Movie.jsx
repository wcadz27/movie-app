import React, { useState } from "react";
import { PlayIcon } from "../assets/Icons/Icons";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const Movie = ({ item, setShowModal }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  if (item.name) {
    item.title = item.name;
  }

  const movieID = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save a movie");
    }
  };

  return (
    <div className="flex relative flex-col w-full h-auto">
      <div></div>
      <div
        onClick={() => setShowModal(item)}
        className="relative min-w-[180px] md:min-w-[220px] min-h-[260px] md:min-h-[320px] h-auto p-2"
        /* className="flex w-full h-full cursor-pointer" */
      >
        <img
          className="rounded-2xl cursor-pointer md:min-h-[320px] min-h-[260px] h-auto w-full"
          src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
          alt={item?.title}
        />
        <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 rounded-2xl cursor-pointer">
          <PlayIcon />
          <div onClick={saveShow}>
            {like ? (
              <FaHeart className="absolute top-4 left-4 text-gray-400" />
            ) : (
              <FaRegHeart className="absolute top-4 left-4 text-gray-400" />
            )}
          </div>
        </div>
      </div>
      <div>
        <p className="text-white text-center mt-4">{item?.title}</p>
      </div>
    </div>
  );
};

export default Movie;
