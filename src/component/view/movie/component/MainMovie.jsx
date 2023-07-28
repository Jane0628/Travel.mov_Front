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
      z-index: -5;
    }
    .video-container{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -5;

      display: flex;
      align-items: center;
      justify-content: center;
      .header-video{
        width: 100%
      }
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

      /* 2줄로 제한 두기 */
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
`;

const videoHandler = (title) => {
  if (title === '바비') {
    return require("../../../../video/barbie.mp4");
  }

  // if (title === '플래시') {
  //   return require("../../../../img/flash.jpg");
  // }
}

export default memo(function Header({ mainMovie }) {
  const { title, backdrop_path, overview, release_date, vote_average } = mainMovie;
  const videoSrc = videoHandler(title);

  return (
    <HeaderMovie backdrop_path={backdrop_path}>
      <div className="frame" id={title}>
        {/* <img src={imageHandler(title)} alt="" /> */}
        <div className="video-container">
          <video className="header-video" autoPlay muted loop >
            <source src={videoSrc} type="video/mp4" />
            브라우저가 비디오 태그를 지원하지 않습니다.
          </video>
        </div>
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