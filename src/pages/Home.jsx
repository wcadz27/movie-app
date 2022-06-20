import React, { useState } from "react";
import Main from "../components/Main";
import MovieInfo from "../components/MovieInfo";
import Row from "../components/Row";
import requests from "../Requests";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Main setShowModal={setShowModal} />
      {showModal ? <MovieInfo setShowModal={setShowModal} /> : null}
      <Row rowID="1" title="Upcoming" fetchURL={requests.requestUpcoming} />
      <Row rowID="2" title="Popular" fetchURL={requests.requestPopular} />
      <Row rowID="3" title="Trending" fetchURL={requests.requestTrending} />
      <Row rowID="4" title="Top Rated" fetchURL={requests.requestTopRated} />
      <Row rowID="5" title="Horrors" fetchURL={requests.requestHorror} />
    </>
  );
};

export default Home;
