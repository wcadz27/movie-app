import axios from "axios";
import React, { useEffect, useState } from "react";
import Main from "../components/Main";
import MovieInfo from "../components/MovieInfo";
import Row from "../components/Row";
import { requests, key, tvSeriesRequests } from "../Requests";

const Home = () => {
  const [showModal, setShowModal] = useState(undefined);
  const [movies, setMovies] = useState([]);

  const castsRequest = `https://api.themoviedb.org/3/movie/${showModal?.id}/credits?api_key=${key}&language=en-US`;
  const trailerRequest = `https://api.themoviedb.org/3/movie/${showModal?.id}/videos?api_key=${key}&language=en-US`;
  const similarMoviesRequest = `https://api.themoviedb.org/3/movie/${showModal?.id}/similar?api_key=${key}&language=en-US&page=1`;

  //Select movie in random so main page displays a different popular movie everytime the page loads
  const randomPopularMovie = movies[Math.floor(Math.random() * movies.length)];

  const tvSeriesTitles = [
    "Popular TV Series",
    "Top Rated TV Series",
    "On Going TV Series",
  ];

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

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
      <Row
        setShowModal={setShowModal}
        rowID="5"
        title="Horrors"
        fetchURL={requests.requestHorror}
      />
      {Object.keys(tvSeriesRequests).map((el, index) => (
        <Row
          setShowModal={setShowModal}
          rowID={`${index + 5}`}
          title={tvSeriesTitles[index]}
          fetchURL={tvSeriesRequests[el]}
        />
      ))}
    </>
  );
};

export default Home;
