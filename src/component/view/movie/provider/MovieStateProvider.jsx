import { useState, useEffect } from "react";
import { NowPlayingMovie, TopRatedMovie } from '../api/index';
import React from 'react';
import NowPlayingMovieContext from "../contexts/NowPlayingMovieContext";
import TopRatedMovieContext from "../contexts/TopRatedMovieContext";

export default function MovieStateProvider({ children }) {

  const [nowPlaying, setNowPlayingMovie] = useState({
    data: [],
    loading: true
  });
  const [topRated, setTopRatedMovie] = useState({
    data: [],
    loading: true
  });

  const getData = async () => {
    const [nowPlayingData, topRatedData] =
      await Promise.all([
        NowPlayingMovie(),
        TopRatedMovie()
      ]);
    setNowPlayingMovie((prev) => {
      return { ...prev, data: nowPlayingData, loading: false }
    });
    setTopRatedMovie((prev) => {
      return { ...prev, data: topRatedData, loading: false }
    });
  }

  useEffect(() => {
    if (nowPlaying.data.length === 0) {
      getData();
    }
    else return;
  }, []);

  return (
    <>
      <NowPlayingMovieContext.Provider value={nowPlaying}>
        <TopRatedMovieContext.Provider value={topRated}>
          {children}
        </TopRatedMovieContext.Provider>
      </NowPlayingMovieContext.Provider>
    </>
  )
}