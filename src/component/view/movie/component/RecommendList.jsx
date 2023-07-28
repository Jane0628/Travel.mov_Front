import { useState } from "react"
import styled from "styled-components";
import Navbar from "../component/Navbar"
import Header from "../../../layout/Header";

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

export default function RecommendList() {
  const [movieList, setMovieList] = useState([]);

  //비동기 통신 한국추천영화
  useEffect(() => {
    fetch('http://localhost:8181/movie/ko', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setMovieList(json);
      })
  }, []);

  const [page, setPage] = useState(1);

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
      <Header />
      <Navbar />
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