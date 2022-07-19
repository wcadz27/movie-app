import axios from "axios";
import React, { useEffect, useState } from "react";
import Main from "../components/Main";
import MovieInfo from "../components/MovieInfo";
import Row from "../components/Row";
import {
  requests,
  key,
  requestGenre,
  requestGenreMovieRow,
  requestGenreMovieRowV2,
} from "../Requests";
import { genreChecker } from "../genres";

const Genre = ({ genre }) => {
  const [showModal, setShowModal] = useState(undefined);
  const [movies, setMovies] = useState([]);

  const [testMovies, setTestMovies] = useState([]);

  const castsRequest = `https://api.themoviedb.org/3/movie/${showModal?.id}/credits?api_key=${key}&language=en-US`;
  const trailerRequest = `https://api.themoviedb.org/3/movie/${showModal?.id}/videos?api_key=${key}&language=en-US`;
  const similarMoviesRequest = `https://api.themoviedb.org/3/movie/${showModal?.id}/similar?api_key=${key}&language=en-US&page=1`;

  //Select movie in random so main page displays a different popular movie everytime the page loads
  const randomPopularMovie = movies[Math.floor(Math.random() * movies.length)];

  const genreType = genreChecker(genre.id);
  const requestGenreURL = requestGenre("upcoming", genreType, genre.id);

  useEffect(() => {
    if (genreType === "isBoth") {
      const requestOne = axios.get(requestGenreURL[0]);
      const requestTwo = axios.get(requestGenreURL[1]);
      axios
        .all([requestOne, requestTwo])
        .then(
          axios.spread((...responses) => {
            setMovies(responses[0].data.results);
            movies.concat(responses[1].data.results);
          })
        )
        .catch((errors) => {
          console.log(errors);
        });
    } else {
      axios.get(requestGenreURL).then((response) => {
        setMovies(response.data.results);
      });
    }
  }, [genreType]);

  console.log(movies);

  /* useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setTestMovies(response.data.results);
    });
  }, []); */

  return (
    <>
      <Main
        setShowModal={setShowModal}
        randomPopularMovie={randomPopularMovie}
      />
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
        rowID="2"
        title="Popular"
        fetchURL={requests.requestPopular}
      />
      <Row
        setShowModal={setShowModal}
        rowID="1"
        title="Upcoming"
        fetchURL={requests.requestUpcoming}
      />
      <Row
        setShowModal={setShowModal}
        rowID="3"
        title="Trending"
        fetchURL={requests.requestTrending}
      />
      <Row
        setShowModal={setShowModal}
        rowID="4"
        title="Top Rated"
        fetchURL={requests.requestTopRated}
      />
    </>
  );
};

export default Genre;
