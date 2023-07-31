import { useState } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../../../layout/Header";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 270px);
    gap: 15px;
    justify-content: center;
    align-content: center;
    margin: 40px;
`;

const Item = styled.div`
    @keyframes trans {
        from {
            opacity: 0;
            transform: translateY(-30%);
            visibility: hidden;
        }
        to {
            opacity: 1;
            transform: translateY(0);
            visibility: visible;
        }
    }
    animation: trans .6s linear;
    
    justify-self: center;
    img {
        width: 270px;
        height: 400px;
        transition: 0.5s;
        &:hover,
        &:focus {
          transform: scale3d(1.08, 1.08, 1);
          opacity: 1;
          box-shadow: 0 8px 17px 0 rgba(0, 0, 0, .2), 0 6px 20px 0 rgba(0, 0, 0, .2);
        }
    }
`;

const PageBtn = styled.div`
    
    text-align: center;
    margin-bottom: 30px;
    button {
        padding: 5px 10px;
        margin-right: 5px;
        background-color: transparent;
        border: 2px solid #424180;
        border-radius: 5px;
        color: #424180;
        cursor: pointer;
        &:last-child {
            margin-right: 0;
        }
        &:hover {
            background: #b1bff9;
            transition: 0.7s;
        }
        &:active {
            color: #1b1a1a;
            background: crimson;
        }
    }
`;

export default function FullList({ movieList }) {
  const [page, setPage] = useState(1);
  const IMAGE_URL = "https://image.tmdb.org/t/p/w300/";
  const navigate = useNavigate();
  console.log(movieList);

  const handlePagination = (currentPage) => {
    setPage(currentPage);
  }
  const handleClick = (id) => {
    navigate(`/movie/${id}`);
  }
  const pagination = (length) => {
    let pageButton = [];
    for (let i = 1; i < length + 1; i++) {
      pageButton.push(<button key={i} onClick={() => handlePagination(i)}>{i}</button>)
    }
    return pageButton;
  }
  return (
    <>
      <Header />
      <GridContainer>
        {movieList[page - 1].map((movie) =>
          <Item key={movie.id} onClick={() => handleClick(movie.id)}>
            <img src={IMAGE_URL + movie.poster_path} className="shadow-lg p-3 mb-5 bg-white rounded" />
          </Item>
        )}
      </GridContainer>
      <PageBtn>{pagination(movieList.length)}</PageBtn>
    </>
  )
}