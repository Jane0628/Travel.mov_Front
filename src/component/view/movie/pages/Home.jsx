import { useContext, useState } from 'react';
import styled from 'styled-components';
import NowPlayingMovieContext from '../contexts/NowPlayingMovieContext';
import UpcomingMovieContext from '../contexts/UpcomingMovieContext';
import Header from '../component/Header';
import Loading from '../component/Loading';
import HomeMovieList from '../component/HomeMovieList';

const Container = styled.div`
    margin: 40px;
`;

export default function Home() {

  const nowPlaying = useContext(NowPlayingMovieContext);
  const upcoming = useContext(UpcomingMovieContext);
  const [rankMovieList, setRankMovieList] = useState([]);

  const getDescRankMovieList = () => {
    let movieList = [];
    console.log(movieList);
    if (nowPlaying.data.length !== 0) {
      [movieList] = nowPlaying.data;
      movieList.sort((a, b) => b.popularity - a.popularity);
    }
    return movieList;
  }
  if (nowPlaying.loading && upcoming.loading) {
    return <Loading />
  }
  if (!nowPlaying.loading) {
    if (!rankMovieList.length) {
      const rankList = getDescRankMovieList();
      setRankMovieList((prev) => prev.concat(rankList));
    }
  }

  return (
    <>
      <Header className="header" mainMovie={rankMovieList[0]} />
      <Container>
        <HomeMovieList
          title={'Now Playing Movie'}
          movieList={rankMovieList}
          navLink={'/now_playing'}
        />
        <HomeMovieList
          title={'Upcoming Movie'}
          movieList={upcoming.data[0]}
          navLink={'/upcoming'}
        />
      </Container>
    </>
  )
}