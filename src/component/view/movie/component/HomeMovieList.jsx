import React from 'react';
import HomeMovieItem from './HomeMovieItem';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MovieListContainer = styled.div`
  margin-bottom: 50px;

  .main-title{
    display:flex;
    justify-content: space-between;
    color: #424180;

    .title{
      font-size: 30px;
      font-weight: 500;
    }
  }

  .movieList {
    overflow: auto;
  }

    .moreBtn {
        margin: auto 0;
        font-weight: 700;
        cursor: pointer;
        transition: 0.5s;
        &:hover,
        &:focus {
          transform: scale3d(1.1, 1.1, 1);
          opacity: 1;
        }
    }
`;
const MovieListWrapper = styled.div`
    display: flex;
    overflow: auto;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export default function HomeMovieList({ title, movieList, navLink }) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${navLink}`);
  }

  return (
    <>
      {movieList &&
        <MovieListContainer>
          <div className="main-title">
            <div>
              <div>TOP 20 Popular</div>
              <div className="title">{title}</div>
            </div>
            <div className="moreBtn" type="button" onClick={handleClick}>더보기 {'>'}</div>
          </div>
          <MovieListWrapper className='movieList'>
            {movieList.length !== 0 &&
              movieList.map((movie, idx) =>
                <HomeMovieItem key={movie.id} movie={movie} rank={idx + 1}></HomeMovieItem>
              )}
          </MovieListWrapper>
        </MovieListContainer>
      }
    </>
  )
}