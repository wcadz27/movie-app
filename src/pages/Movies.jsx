import React, { useEffect, useState } from "react";
import { requests, key } from "../Requests";
import Row from "../components/Row";
import axios from "axios";
import MovieInfo from "../components/MovieInfo";
import Main from "../components/Main";

const Movies = () => {
  const [showModal, setShowModal] = useState(undefined);
  const castsRequest = `https://api.themoviedb.org/3/movie/${showModal?.id}/credits?api_key=${key}&language=en-US`;
  const trailerRequest = `https://api.themoviedb.org/3/movie/${showModal?.id}/videos?api_key=${key}&language=en-US`;
  const similarMoviesRequest = `https://api.themoviedb.org/3/movie/${showModal?.id}/similar?api_key=${key}&language=en-US&page=1`;

  const [movies, setMovies] = useState([]);

  //Select movie in random so main page displays a different popular movie everytime the page loads

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        axios.get(requests.requestPopular).then((response) => {
          setMovies(response.data.results);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchPopularMovies();
  }, []);

  return (
    <>
      <Main setShowModal={setShowModal} showsHero={movies.slice(0, 5)} />
      {showModal !== undefined ? (
        <MovieInfo
          setShowModal={setShowModal}
          showModal={showModal}
          fetchCastsURL={castsRequest}
          fetchTrailerURL={trailerRequest}
          fetchSimilarMoviesURL={similarMoviesRequest}
        />
      ) : null}
      <Row
        setShowModal={setShowModal}
        rowID="1"
        title="Upcoming"
        fetchURL={requests.requestUpcoming}
      />
      <Row
        setShowModal={setShowModal}
        rowID="1"
        title="Upcoming"
        fetchURL={requests.requestUpcoming}
      />
      <Row
        setShowModal={setShowModal}
        rowID="1"
        title="Upcoming"
        fetchURL={requests.requestUpcoming}
      />
    </>
  );
};

export default Movies;
