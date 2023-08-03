import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import NowPlayingMovieContext from '../contexts/NowPlayingMovieContext';
import TopRatedMovieContext from '../contexts/TopRatedMovieContext';
import Loading from '../component/Loading';
import HomeMovieList from '../component/HomeMovieList';
import MainMovie from '../component/MainMovie';
import Header from '../../../layout/Header';
import { API_BASE_URL } from '../../../../util/host-utils';

const Container = styled.div`margin: 40px;`;

export default function Home() {
  const nowPlaying = useContext(NowPlayingMovieContext);
  const topRated = useContext(TopRatedMovieContext);
  const [rankMovieList, setRankMovieList] = useState([]);
  const [freeList, setFreeList] = useState([]);

  const getDescRankMovieList = () => {
    let movieList = [];
    if (nowPlaying.data.length) {
      [movieList] = nowPlaying.data;
      movieList.sort((a, b) => b.popularity - a.popularity);
    }
    return movieList;
  }

  const getFreeList = async () => {
    const res = await fetch(`${API_BASE_URL}/freeBoard`, {
      method: "GET",
      headers:{ "content-type": "application/json"},
    });

    if (res.status === 200) {
      const json = await res.json();
      console.log(json);
      if (json.freeBoards) {
        // 필요한 속성들을 추출하여 새로운 리스트 생성
        const formattedList = json.freeBoards.map((item) => ({
          id: item.hotel.id,
          poster_path:'' ,
          img : item.hotel.img,
          title: item.title,
          vote_average: '',
          star : item.star,
          release_date: '',
          uploadDate : item.uploadDate.split("T")[0]
        }));
  
        // 추출한 데이터로 리스트 업데이트
        setFreeList(formattedList);
        console.log(formattedList);
      }
    } else {
        alert("관리자에게 문의하세요!");
    }
  };

  useEffect(() => {
    getFreeList();
  }, []);

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
        <HomeMovieList
        title={'후기리스트'}
        movieList={freeList}
        navLink={'/topRated'}/>
      </Container>
    </>
  );
}