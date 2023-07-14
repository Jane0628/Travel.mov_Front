import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NowPlayingMovie from "./pages/NowPlayingMovie";
import UpcomingMovie from "./pages/UpcomingMovie";
import Detail from "./pages/Detail";
import MovieStateProvider from "./provider/MovieStateProvider";
import "./common.css";
import Navbar from "./component/Navbar";

function TodaysMovieDetail() {
  return (
    <>
      <BrowserRouter basename="/react-movie-app">
        <MovieStateProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/now_playing" element={<NowPlayingMovie />} />
            <Route path="/upcoming" element={<UpcomingMovie />} />
            <Route path="/movie/:movie_id" element={<Detail />} />
          </Routes>
        </MovieStateProvider>
      </BrowserRouter>
    </>
  );
}

export default TodaysMovieDetail;
