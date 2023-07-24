import { useState, useEffect } from "react";
import { NowPlayingMovie, PopularMovie } from '../api/index';
import React from 'react';
import NowPlayingMovieContext from "../contexts/NowPlayingMovieContext";
import PopularMovieContext from "../contexts/PopularMovieContext";

export default function MovieStateProvider({ children }) {

  const [nowPlaying, setNowPlayingMovie] = useState({
    data: [],
    loading: true
  });
  const [popular, setPopularMovie] = useState({
    data: [],
    loading: true
  });

  const getData = async () => {
    const [nowPlayingData, popularData] =
      await Promise.all([
        NowPlayingMovie(),
        PopularMovie()
      ]);
    setNowPlayingMovie((prev) => {
      return { ...prev, data: nowPlayingData, loading: false }
    });
    setPopularMovie((prev) => {
      return { ...prev, data: popularData, loading: false }
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
        <PopularMovieContext.Provider value={popular}>
          {children}
        </PopularMovieContext.Provider>
      </NowPlayingMovieContext.Provider>
    </>
  )
}