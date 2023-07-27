import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetail } from "../api";
import Loading from "../component/Loading";
import styled from "styled-components";
import DetailMovie from '../component/DetailMovie';
import Header from "../../../layout/Header";

const MovieContainer = styled.div`
    @keyframes trans {
      from {
          opacity: 0;
          visibility: hidden;
      }
      to {
          opacity: 1;
          visibility: visible;
      }
    }
    animation: trans 1s linear;

    position: relative;
    width: 100%;
    height: 100%;
    
    &::before{ //한번 더
        content: "";
        position: absolute;
        ${props => `
            background-image: url(${props.imgUrl});
        `}
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        
        opacity: 0.2;
        top: 0;
        left:0;
        right:0;
        bottom:0;
    }
`;

export default function Detail() {

  const IMAGE_URL = "https://image.tmdb.org/t/p/original/";

  const path = useParams();
  const [movieId, setMovieId] = useState(path.movie_id);
  const [movie, setMovie] = useState({});

  // 로딩 상태를 추가하여 컴포넌트의 로딩 상태를 처리합니다.
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const res = await getDetail(movieId);
      setMovie(prev => ({ ...prev }, res));
      setLoading(false); // 데이터를 성공적으로 가져온 후 로딩 상태를 false로 설정합니다.
    } catch (error) {
      console.error(error);
      setLoading(false); // 오류가 발생할 경우 로딩 상태를 false로 설정합니다.
    }
  };

  useEffect(() => {
    getData();
  }, [movieId]);

  if (loading) {
    return <Loading />;
  }

  // if (!Object.keys(movie).length) {
  //   return <Loading />
  // }
  return (
    <>
      <Header />
      <MovieContainer imgUrl={IMAGE_URL + movie.poster_path}>
        <DetailMovie
          movieInfo={movie}
          imageUrl={IMAGE_URL}
        />
      </MovieContainer>
    </>
  )
}