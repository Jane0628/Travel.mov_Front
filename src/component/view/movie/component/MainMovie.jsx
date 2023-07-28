import { React, memo } from 'react';
import styled from 'styled-components';
import Star from './Star';

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
  margin-top: 80px;
  
  .frame {
    position: absolute;
    top: 0;
    width: 100%;
    height: 600px;
    overflow: hidden;
    display: flex;
    background: linear-gradient(
    rgba(27, 26, 26, 1) 0%,
    rgba(20, 20, 20, 0.2) 30%,
    rgba(20, 20, 20, 0) 50%,
    rgba(20, 20, 20, 0.2) 70%,
    rgba(27, 26, 26, 1) 100%
    );
      
    &#바비 {
      align-items: start;
    }

    &#플래시 {
      align-items: center;
    }
      
    img {
      width: 100%;
      min-width: 1068px;
      min-height: 600px;
      z-index: -5;
    }
  }
    
  .info{
    z-index: 100;
    color: white;
    position: absolute;
    left: 3%;
    bottom: 5%;

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

      /* 2줄로 제한 두기 */
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
`;

const imageHandler = (title) => {
  if (title === '바비') {
    return require("../../../../img/barbie.jpg");
  }

  if (title === '플래시') {
    return require("../../../../img/flash.jpg");
  }

  return "https://image.tmdb.org/t/p/w1280";
}

export default memo(function Header({ mainMovie }) {
  const { title, backdrop_path, overview, release_date, vote_average } = mainMovie;
  return (
    <HeaderMovie backdrop_path={backdrop_path}>
      <div className="frame" id={title}>
        <img src={imageHandler(title)} alt="" />
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