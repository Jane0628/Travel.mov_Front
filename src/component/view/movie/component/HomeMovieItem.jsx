import styled from "styled-components"
import { useNavigate } from "react-router-dom";

const IMAGE_URL = "https://image.tmdb.org/t/p/w300/";

const Item = styled.div`
    margin: 25px;
    &:first-child {
        margin-left:0;
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
            max-height: 35%;
            position: absolute;
            bottom: 0;
            >div{
                margin-bottom: 0px;
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
      <div className="container" onClick={handleClick}>
        <div className="rank">{rank}</div>
        <div className="info">
          <div className="vote-average">({vote_average}/10)</div>
          <div className="title">{title}</div>
          <div className="release-date">개봉일 : {release_date}</div>
        </div>
      </div>
    </Item>
  )
}