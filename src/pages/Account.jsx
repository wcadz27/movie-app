import React from "react";
import SavedShows from "../components/SavedShows";

const Account = () => {
  return (
    <>
      <div className="flex flex-col h-full w-full">
        <div className="h-[350px] w-full">
          <div className="flex items-center absolute w-full h-[350px] bg-gradient-to-r from-black">
            {" "}
            <h1 className="absolute text-white text-3xl md:text-4xl font-bold ml-4">
              {" "}
              My Shows
            </h1>
          </div>
          <img
            className="w-full h-full object-cover"
            src="https://fandomwire.com/wp-content/uploads/2018/08/Movies-background-1068x616.png"
            alt="movieslist"
          />
        </div>
        <div className="w-full h-full">
          <SavedShows />
        </div>
      </div>
    </>
  );
};

export default Account;
