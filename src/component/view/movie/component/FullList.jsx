import { useState } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 270px);
    gap: 8px;
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
    }
`;

const PageBtn = styled.div`
    
    text-align: center;
    margin-bottom: 30px;
    button {
        padding: 5px 10px;
        margin-right: 5px;
        background-color: transparent;
        border: 2px solid crimson;
        border-radius: 5px;
        color: crimson;
        cursor: pointer;
        &:last-child {
            margin-right: 0;
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

  const handlePagination = (currentPage) => {
    setPage(currentPage);
  }
  const handleClick = (id) => {
    navigate(`/movie/${id}`);
  }
  const pagination = () => {
    let pageButton = [];
    for (let i = 1; i < movieList.length + 1; i++) {
      pageButton.push(<button key={i} onClick={() => handlePagination(i)}>{i}</button>)
    }
    return pageButton;
  }
  return (
    <>
      <GridContainer>
        {movieList[page - 1].map((movie) =>
          <Item key={movie.id} onClick={() => handleClick(movie.id)}>
            <img src={IMAGE_URL + movie.poster_path} />
          </Item>
        )}
      </GridContainer>
      <PageBtn>{pagination()}</PageBtn>
    </>
  )
}