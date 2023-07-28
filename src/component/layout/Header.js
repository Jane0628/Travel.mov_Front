import React, { useContext } from 'react';
import logo from '../../img/logo.png';
import "../../design/layout/header.scss";
import { Link, Router, useNavigate } from 'react-router-dom';
import AuthContext from '../../util/AuthContext';
import axios from 'axios';
import { useState } from 'react';
import { Box, Button, Divider, Drawer, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Image } from 'react-bootstrap';

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
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: '400px' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Image src={require('../../img/profileImage.png')} width={'80px'} />
        <ListItemText primary={isLoggedIn ? '메롱' : '로그인 후 이용해주세요.'} />
      </List>
      <Divider />
      <List>
        {['로그인', '회원가입', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 && <LockOutlinedIcon />}
                {index === 1 && <AssignmentIcon />}
                {index === 2 && <LockOutlinedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <header>
        {/* 로고 */}
        <Image src={require("../../img/long_logo.png")} onClick={moveToMainPage} />

        <div class="right">
          {/* 검색 */}
          <form onSubmit={searchHandler}>
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
              }}
            />
          </form>
          {/* 햄버거 */}
          {['right'].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}><MenuIcon /></Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </div>
      </header>
    </>
  );
}

export default Header;