import axios from "axios";
import React, { useEffect, useState } from "react";
import Main from "../components/Main";
import MovieInfo from "../components/MovieInfo";
import Row from "../components/Row";
import { requests, tvSeriesRequests } from "../Requests";

const Home = () => {
  const [showModal, setShowModal] = useState(undefined);
  const [showType, setShowType] = useState("");
  const [movies, setMovies] = useState([]);

  const tvSeriesTitles = [
    "Popular TV Series",
    "Top Rated TV Series",
    "On Going TV Series",
  ];

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        await axios.get(requests.requestPopular).then((response) => {
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
          showType={showType}
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
          isTVSeries={true}
          setShowType={setShowType}
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
