import React from "react";
import { RiEmotionSadLine } from "react-icons/ri";

const Error = () => {
  return (
    <div className="text-white relative flex flex-col w-full h-[100vh] items-center justify-center">
      <RiEmotionSadLine fontSize="20em" />{" "}
      <h1 className=" font-semibold text-[5em]">404</h1>
      <p className="text-[2em] w-[70%] text-center">
        The page you are looking for does not exist or error has occured. Go
        back home and explore more other movies
      </p>
    </div>
  );
};

export default Error;
