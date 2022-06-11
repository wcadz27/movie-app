import React from "react";
import SavedShows from "../components/SavedShows";

const Account = () => {
  return (
    <>
      <div className="absolute top-[20%]">
        <h1 className="text-white text-3xl md:text-5xl font-bold"> My Shows</h1>
        <SavedShows />
      </div>
    </>
  );
};

export default Account;
