import axios from "axios";
import React, { useEffect, useState } from "react";
import Main from "../components/Main";
import MovieInfo from "../components/MovieInfo";
import Row from "../components/Row";
import { requests, key } from "../Requests";

const Home = () => {
  const [showModal, setShowModal] = useState(undefined);
  const [movies, setMovies] = useState([]);

  const castsRequest = `https://api.themoviedb.org/3/movie/${showModal?.id}/credits?api_key=${key}&language=en-US`;
  const trailerRequest = `https://api.themoviedb.org/3/movie/${showModal?.id}/videos?api_key=${key}&language=en-US`;

  //Select movie in random so main page displays a different popular movie everytime the page loads
  const randomPopularMovie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  console.log(showModal);

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
      <Row
        setShowModal={setShowModal}
        rowID="5"
        title="Horrors"
        fetchURL={requests.requestHorror}
      />
    </>
  );
};

export default Home;
