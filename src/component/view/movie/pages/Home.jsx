import { useContext, useState } from 'react';
import styled from 'styled-components';
import NowPlayingMovieContext from '../contexts/NowPlayingMovieContext';
import TopRatedMovieContext from '../contexts/TopRatedMovieContext';
import Loading from '../component/Loading';
import HomeMovieList from '../component/HomeMovieList';
import MainMovie from '../component/MainMovie';
import Header from '../../../layout/Header';

const Container = styled.div`margin: 40px;`;

export default function Home() {

  const nowPlaying = useContext(NowPlayingMovieContext);
  const topRated = useContext(TopRatedMovieContext);
  const [rankMovieList, setRankMovieList] = useState([]);

  const getDescRankMovieList = () => {
    let movieList = [];
    if (nowPlaying.data.length) {
      [movieList] = nowPlaying.data;
      movieList.sort((a, b) => b.popularity - a.popularity);
    }
    return movieList;
  }

  // 로딩 중일 시 로딩 화면 보여주기
  if (nowPlaying.loading && topRated.loading) {
    return <Loading />
  } else if (!rankMovieList.length) {
    const rankList = getDescRankMovieList();
    setRankMovieList((prev) => prev.concat(rankList));
  }

  return (
    <>
      <Header />
      <MainMovie mainMovie={rankMovieList[0]} />
      <Container>
        <HomeMovieList
          title={'현재 상영 중인 영화'}
          movieList={rankMovieList}
          navLink={'/now_playing'}
        />
        <HomeMovieList
          title={'평점이 높은 영화'}
          movieList={topRated.data[0]}
          navLink={'/topRated'}
        />
      </Container>
    </>
  )
}