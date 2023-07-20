import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetail } from "../api";
import Loading from "../component/Loading";
import styled from "styled-components";
import DetailMovie from '../component/DetailMovie';

const MovieContainer = styled.div`

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
}   
`;

export default function Detail() {

  const IMAGE_URL = "https://image.tmdb.org/t/p/original/";

  const path = useParams();
  const [movieId, setMovieId] = useState(path.movie_id);
  const [movie, setMovie] = useState({});

  const getData = async () => {
    const res = await getDetail(movieId);
    setMovie(prev => ({ ...prev }, res));
  }
  useEffect(() => {
    getData();
  }, [movieId]);

  if (!Object.keys(movie).length) {
    return <Loading />
  }
  return (
    <MovieContainer imgUrl={IMAGE_URL + movie.poster_path}>
      <DetailMovie
        movieInfo={movie}
        imageUrl={IMAGE_URL}
      />
    </MovieContainer>
  )
}