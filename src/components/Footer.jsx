import React from "react";
import { Link } from "react-router-dom";
import { filteredAllGenres } from "../genres";

const Footer = () => {
  return (
    <>
      <div className="bottom-0 relative h-[350px]">
        <div className="h-[350px] w-full absolute">
          <div className="flex items-center absolute w-full h-[350px] bg-black/70">
            {" "}
          </div>
          <img
            className="w-full h-full object-cover"
            src="https://fandomwire.com/wp-content/uploads/2018/08/Movies-background-1068x616.png"
            alt="movieslist"
          />
        </div>
        <div className="z-10 absolute w-full h-full">
          <div className="text-white text-xl font-semibold flex w-full h-full justify-center items-center">
            <ul className="flex flex-col gap-y-4">
              <Link to="/">
                <li className="w-[50%] inline-block list-none cursor-pointer">
                  Home
                </li>
              </Link>
              {["Contact", "Terms and Conditions", "About"].map(
                (link, index) => (
                  <Link to={`${link.toLowerCase().replace(" ", "")}`}>
                    <li className="w-[50%] inline-block list-none cursor-pointer">
                      {link}
                    </li>
                  </Link>
                )
              )}
            </ul>
            <ul className="flex flex-col gap-y-4">
              <li className="p-0 inline-block list-none cursor-pointer relative">
                <p className="peer">Genre</p>
                <div className="absolute hidden peer-hover:flex hover:flex w-[800px] bottom-[50px]">
                  <ul className="justify-center w-[800px] bg-gray-800">
                    <div className="ml-[5%] w-[700px] flex flex-wrap">
                      {filteredAllGenres.map((genre, id) => (
                        <Link
                          to={`/genre/${genre
                            .toLowerCase()
                            .replace(/\s/g, "")
                            .replace(/\W+/g, "-")}`}
                          className="basis-1/3 p-[1em] hover:bg-gray-900"
                          key={id}
                        >
                          <li>{genre}</li>
                        </Link>
                      ))}
                    </div>
                  </ul>
                </div>
              </li>
              {["TV Series", "Movies"].map((link, index) => (
                <Link to={`${link.toLowerCase().replace(" ", "")}`}>
                  <li className="p-0 inline-block list-none cursor-pointer">
                    {link}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
