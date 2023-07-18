import React from 'react';
import styled from 'styled-components';
import Star from '../component/Star';

const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";

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

    position: relative;
    width: 100%;
    height: 570px;
    display: flex;
    align-items: center;
    background: linear-gradient(
        rgba(27, 26, 26, 1) 5%,
        rgba(20, 20, 20, 0.6) 35%,
        rgba(20, 20, 20, 0.4) 65%,
        rgba(20, 20, 20, 0.6) 95%,
        rgba(27, 26, 26, 1) 100%
      ), ${props => `url('${IMAGE_URL + props.backdrop_path}');`}
      background-repeat: no-repeat;
      background-size: 100% 100%;
        
        .info{
            position: absolute;
            left: 30px;
            color: white;
            .title {
                    margin-top: 0;
                    font-size: 50px;
                    font-weight: 700;
                    overflow-wrap: break-word;
            }
            .sub-info{
                display: flex;
                font-size: 20px;
                .release-date {
                    margin-right: 15px;
                }
            }
            .overview {
                width: 45%;
                font-size: 20x;
                font-weight: 300;
                overflow-wrap: break-word;
            }
        }
    }
`;

export default React.memo(function Header({ mainMovie }) {
  const { title, backdrop_path, overview, release_date, vote_average } = mainMovie;
  return (
    <HeaderMovie backdrop_path={backdrop_path}>
      <div className="info">
        <p className='title'>{title}</p>
        <div className='sub-info'>
          <div className='release-date'>{release_date}</div>
          <Star vote_average={vote_average}></Star>
          <div className='vote-average'>{vote_average}</div>
        </div>
        <p className="overview">{overview}</p>
      </div>
    </HeaderMovie>
  )
})