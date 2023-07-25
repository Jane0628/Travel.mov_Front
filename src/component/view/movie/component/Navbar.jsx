import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavbarWrapper = styled.div`
  
  padding: 10px;
  top:0;
  ul {
    margin:0;
    padding: 4px 0px;
    display: flex;
    list-style: none;
    align-items: center;
    li {
      margin-right: 35px;
      font-size: 18px;
      font-weight: 300;
      &:last-child {
        margin-right: 0px;
      }
    }
    a {
      text-decoration: none;
      color: #424180;
      &:hover {
        color: crimson;
      }
      &:active {
        color: white;
      }
    }
  }
}
`;

export default function Header() {

  const [text, setText] = useState('');

  const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
      api_key: process.env.REACT_APP_TMDBAPI_KEY,
    },
  });

  const searchMovie = async (text) => {
    let Data = [];
    try {
      const res = await instance.get(`/search/movie?language=ko-KR&page=1&query=${text}`, {
        params: {
          region: "KR"
        },
      });
      Data.push(res.data.results);
      return Data;
    } catch (error) {
      console.log(error);
    }
  }

  const inputHandler = e => {
    setText(e.target.value);
  };

  const searchHandler = e => {
    e.preventDefault();
    searchMovie(text);
    setText('');
  };

  return (
    <NavbarWrapper>
      <ul>
        <li className="home"><Link to="/">메인</Link></li>
        <li><Link to="/now_playing">현재 상영 중인 영화</Link></li>
        <li><Link to="/topRated">평점이 높은 영화</Link></li>
        <li>
          <form onSubmit={searchHandler}>
            <input
              type="text"
              onChange={inputHandler}
              value={text}
            />
            <button
              type="submit"
            >
              Search
            </button>
          </form>
        </li>
      </ul>
    </NavbarWrapper>
  )
}