import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import requests from "../Requests";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signUp } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const [movies, setMovies] = useState([]);

  //Select movie in random so main page displays a different popular movie everytime the page loads
  const randomPopularMovie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);
  return (
    <>
      <div className="w-full h-screen relative">
        {" "}
        <img
          src={`https://image.tmdb.org/t/p/original/${randomPopularMovie?.backdrop_path}`}
          alt={randomPopularMovie?.title}
          className="hidden absolute sm:block w-full h-full object-cover"
        />
        <div className="absolute w-full h-screen bg-black/60"></div>
        <div className="h-full w-full z-50 flex flex-col">
          <div className="relative w-[450px] h-[600px] m-auto bg-black/75 text-white rounded-2xl">
            <div className="max-w-[320px] mx-auto py-24">
              <h1 className="text-3xl font-bold">Sign up</h1>
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col py-4"
              >
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 my-2 rounded-lg focus:outline-blue-500 bg-black/60 border-2 border-gray-500"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 my-2 rounded-lg focus:outline-blue-500 bg-black/60 border-2 border-gray-500"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <input
                  className="p-3 my-2 rounded-lg focus:outline-blue-500"
                  type="password"
                  placeholder="Re-enter password"
                  autoComplete="current-password"
                />
                <button
                  className="bg-blue-500 rounded-lg py-2 mt-10"
                  type="submit"
                >
                  Sign up
                </button>
              </form>
              <div className="text-center mt-3">
                <p>
                  Have an account? <Link to="/signin">Sign in</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
