import React from "react";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import UpcomingMovie from "./pages/UpcomingMovie";
import NowPlayingMovie from "./pages/NowPlayingMovie";

function TodaysMovieDetail() {
  return (
    <>
      
          <Navbar />
          <Home />
          <UpcomingMovie />
          <NowPlayingMovie />
          
        
      
    </>
  );
}

export default TodaysMovieDetail;
