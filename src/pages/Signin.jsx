import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import requests from "../Requests";
import { UserAuth } from "../context/AuthContext";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, signIn } = UserAuth();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

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
              <h1 className="text-3xl font-bold">Sign in</h1>
              {error ? <p className="p-2 mt-4 bg-red-400">{error}</p> : null}
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
                <div className="flex items-baseline mt-3">
                  <input type="checkbox" />
                  <span className="ml-4">Remember me</span>
                </div>
                <button
                  className="bg-blue-500 rounded-lg py-2 mt-10"
                  type="submit"
                >
                  Sign in
                </button>
              </form>
              <div className="text-center mt-3">
                <p>
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
                <p>
                  <a href="">Forgot password?</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
