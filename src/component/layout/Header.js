import React, { useContext, useState } from 'react';
import "../../design/layout/header.scss";
import { Link, Router, useNavigate } from 'react-router-dom';
import AuthContext from '../../util/AuthContext';
import axios from 'axios';
import { Box, Button, Divider, Drawer, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Image } from 'react-bootstrap';
import OutputOutlinedIcon from '@mui/icons-material/OutputOutlined';
import PersonIcon from '@mui/icons-material/Person';
import Accordion from './Accordion';
import HamburgerMenu from './HamburgerMenu';

const Header = () => {

  const { isLoggedIn, onLogout, onLogin, nick } = useContext(AuthContext);

  const redirection = useNavigate();

  const moveToMainPage = () => {
    redirection('/');
  }

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
      return [];
    }
  }

  const inputHandler = e => {
    setText(e.target.value);
  };

  const searchHandler = async (e) => {
    e.preventDefault();

    const searchData = await searchMovie(text);
    redirection('/search', { state: { searchData } })
  };

  // 햄버거
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (e) => {
    const accordions = document.getElementsByClassName('css-jsoc8j-MuiTypography-root');

    for (let a in accordions) {
      if (e.target === a) {
        return;
      }
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <>
      <header>
        {/* 로고 */}
        <Image src={require("../../img/long_logo.png")} onClick={moveToMainPage} />

        <div className="right">
          {/* 검색 */}
          <form onSubmit={searchHandler} autoComplete="off">
            <TextField
              id="outlined-start-adornment"
              color='secondary'
              sx={{ width: '25ch', height: '50px' }}
              placeholder='영화 제목을 입력하세요.'
              onChange={inputHandler}
              value={text}
              InputProps={{
                startAdornment:
                  <InputAdornment position="start">
                    <SearchIcon onClick={searchHandler} />
                  </InputAdornment>,
              }} />
          </form>
          {/* 햄버거 */}
          {['right'].map((anchor) => (
            <>
              <Button onClick={toggleDrawer(anchor, true)}><MenuIcon /></Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                <HamburgerMenu anchor />
              </Drawer>
            </>
          ))}
        </div>
      </header>
    </>
  );
}

export default Header;