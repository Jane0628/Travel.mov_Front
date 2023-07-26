import { React, memo } from 'react';
import styled from 'styled-components';
import Star from './Star';

const IMAGE_URL = require("../../../../img/barbie.jpg");

const HeaderMovie = styled.div`
  @keyframes transform {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  animation: transform 1.2s linear;

  height: 600px;
  position: relative;
  
  .frame {
    position: absolute;
    top: 0;
    width: 100%;
    height: 600px;
    overflow: hidden;
    display: flex;
    align-items: start;
    background: linear-gradient(
      rgba(27, 26, 26, 1) 5%,
      rgba(20, 20, 20, 0.5) 20%,
      rgba(20, 20, 20, 0) 50%,
      rgba(20, 20, 20, 0.2) 70%,
      rgba(27, 26, 26, 1) 100%
    );
      
    img {
      width: 100%;
      z-index: -5;
    }
  }
    
  .info{
    z-index: 100;
    color: white;
    position: absolute;
    left: 3%;
    bottom: 10%;

    .title {
      margin: 0;
      font-size: 50px;
      font-weight: 700;
      overflow-wrap: break-word;
      text-shadow: aliceblue;
    }

    .sub-info{
      width: 350px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      .release-date,
      .vote-average {
        font-weight: 200;
      }
    }
    
    .overview {
      width: 45%;
      font-size: 20x;
      font-weight: 300;
      overflow-wrap: break-word;
    }
  }
`;

export default memo(function Header({ mainMovie }) {
  const { title, backdrop_path, overview, release_date, vote_average } = mainMovie;
  return (
    <HeaderMovie backdrop_path={backdrop_path}>
      <div className="frame">
        <img src={IMAGE_URL} alt="" />
      </div>
      <div className="info">
        <p className='title'>{title}</p>
        <div className='sub-info'>
          <div className='release-date'>{release_date}</div>
          <Star vote_average={vote_average}></Star>
          <div className='vote-average'>({vote_average} / 10)</div>
        </div>
        <p className="overview">{overview}</p>
      </div>
    </HeaderMovie>
  )
})