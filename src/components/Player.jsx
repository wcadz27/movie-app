import React from "react";
import ReactPlayer from "react-player";

const Player = ({ trailer }) => (
  <div className="player-wrapper">
    <ReactPlayer
      url={`https://www.youtube.com/watch?v=${trailer[0]?.key}`}
      className="react-player"
      width="100%"
      height="100%"
      controls={false}
    />
  </div>
);

export default Player;
