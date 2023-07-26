import React, { useContext } from 'react';
import logo from '../../img/logo.png';
import "../../design/layout/header.scss";
import { Link, Router, useNavigate } from 'react-router-dom';
import AuthContext from '../../util/AuthContext';
import axios from 'axios';
import { useState } from 'react';

const Header = () => {

	const { isLoggedIn, onLogout, nick } = useContext(AuthContext);

	const redirection = useNavigate();

	const moveToMainPage = () => {
		redirection('/');
	}

	const logoutHandler = e => {
		e.preventDefault();
		alert('로그아웃 되었습니다');
		onLogout();
		redirection('/login');
	};

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
      console.log(Data);
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
		<>
			<header>
				<img src={logo} alt="logo" onClick={moveToMainPage} />
          <form onSubmit={searchHandler}>
            <input
              placeholder='영화 제목을 입력하세요.'
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
				<div className="spans">
					<>
						{isLoggedIn ?
							(<>
								<Link to="/" onClick={logoutHandler} >로그아웃</Link>
								<Link to="/myPage">마이페이지</Link>
							</>)
							:
							(<>
								<Link to='/login'>로그인</Link>
								<Link to='/join'>회원가입</Link>
							</>)
						}
					</>
				</div>
			</header>
		</>
	);
}

export default Header;