import { useState, useEffect } from "react";
import { NowPlayingMovie, UpcomingMovie } from '../api/index';
import React from 'react';
import NowPlayingMovieContext from "../contexts/NowPlayingMovieContext";
import UpcomingMovieContext from "../contexts/UpcomingMovieContext";

export default function MovieStateProvider({ children }) {

    const [nowPlaying, setNowPlayingMovie] = useState({
        data: [],
        loading: true
    });
    const [upcoming, setUpcomingMovie] = useState({
        data: [],
        loading: true
    });

    const getData = async () => {
        const [nowPlayingData, upcomingData] =
            await Promise.all([
                NowPlayingMovie(),
                UpcomingMovie()
            ]);
        setNowPlayingMovie((prev) => {
            return { ...prev, data: nowPlayingData, loading: false }
        });
        setUpcomingMovie((prev) => {
            return { ...prev, data: upcomingData, loading: false }
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
                <UpcomingMovieContext.Provider value={upcoming}>
                    {children}
                </UpcomingMovieContext.Provider>
            </NowPlayingMovieContext.Provider>
        </>
    )
}