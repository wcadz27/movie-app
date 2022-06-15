import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  return (
    <>
      <div className="w-full h-screen relative">
        {" "}
        <img
          src="https://img.freepik.com/free-vector/seamless-various-film-cinema-graphics-light-blue-background-design_1284-42060.jpg?w=740&t=st=1655297710~exp=1655298310~hmac=973df4f9d248dab01b09a9c6ceaa1b169ae35dd360ace9f2a1e1f3a1c2bb2442"
          alt="movie-backdrop"
          className="hidden absolute sm:block w-full h-full object-cover"
        />
        <div className="absolute w-full h-screen bg-black/60"></div>
        <div className="h-full w-full z-50 flex flex-col">
          <div className="flex justify-center items-center relative w-[450px] h-[500px] m-auto bg-black/75 text-white rounded-2xl">
            <div className="w-[350px]">
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
