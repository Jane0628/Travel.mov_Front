import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import Star from "./Star";

const IMAGE_URL = "https://image.tmdb.org/t/p/w300/";

const Item = styled.div`
    margin: 25px;
    &:first-child {
        margin-left:30px;
    }
    .container{
        position: relative; 
        width: 250px;
        height: 400px;
        ${props => `
            background-image:
            url('${IMAGE_URL + props.url}');`}
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center;
        transition: 0.5s;
        &:hover,
        &:focus {
          transform: scale3d(1.08, 1.08, 1);
          opacity: 1;
          box-shadow: 0 8px 17px 0 rgba(0, 0, 0, .2), 0 6px 20px 0 rgba(0, 0, 0, .2);
        }
        .rank{
            position: absolute;
            left: 10px;
            font-size: 70px;
            font-style: italic;
            font-weight: 700;
            text-shadow: 5px 5px 1px rgba(255,255,255,0.4);
            -webkit-text-stroke: 1px white;
            color: transparent;
        }
            
        .info{
            color: white;
            background-color: rgba(20,20,20,0.3);
            backdrop-filter: blur(3px);
            padding: 15px;
            margin-left: -12px;
            width:100%;
            height: 35%;
            position: absolute;
            bottom: 0;
            display: flex;
            flex-direction: column;
            
            .rate {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .vote-average {
                font-size: 15px;
                font-weight: 300;
            }
            .title {
                font-size: 20px;
            }
            .release-date {
                font-size: 15px;
                font-weight: 300;
            }
        }
    }
`;

export default function MovieItem({ movie, rank }) {

  const { id, poster_path, title, vote_average, release_date } = movie;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/movie/" + id);
  }
  return (
    <Item url={poster_path}>
      <div className="container rounded" onClick={handleClick}>
        <div className="rank">{rank}</div>
        <div className="info rounded">
          <div className="rate">
            <Star vote_average={vote_average} />
            <div className="vote-average">({vote_average}/10)</div>
          </div>
          <div className="title">{title}</div>
          <div className="release-date">개봉일 : {release_date}</div>
        </div>
      </div>
    </Item>
  )
}