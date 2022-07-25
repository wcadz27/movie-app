import React, { useEffect, useState } from "react";
import { requests, key, tvSeriesRequests } from "../Requests";
import Row from "../components/Row";
import axios from "axios";
import MovieInfo from "../components/MovieInfo";
import Main from "../components/Main";

const TVSeries = () => {
  const [showModal, setShowModal] = useState(undefined);
  const castsRequest = `https://api.themoviedb.org/3/tv/${showModal?.id}/credits?api_key=${key}&language=en-US`;
  const trailerRequest = `https://api.themoviedb.org/3/tv/${showModal?.id}/videos?api_key=${key}&language=en-US`;
  const similarMoviesRequest = `https://api.themoviedb.org/3/tv/${showModal?.id}/similar?api_key=${key}&language=en-US&page=1`;

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(tvSeriesRequests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
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
        title="Popular"
        fetchURL={tvSeriesRequests.requestPopular}
      />
      <Row
        setShowModal={setShowModal}
        rowID="2"
        title="Top Rated TV Series"
        fetchURL={tvSeriesRequests.requestTopRated}
      />
      <Row
        setShowModal={setShowModal}
        rowID="3"
        title="Ongoing"
        fetchURL={tvSeriesRequests.requestOnGoing}
      />
    </>
  );
};

export default TVSeries;
