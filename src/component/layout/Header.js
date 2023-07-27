import React, { useContext } from 'react';
import logo from '../../img/logo.png';
import "../../design/layout/header.scss";
import { Link, Router, useNavigate } from 'react-router-dom';
import AuthContext from '../../util/AuthContext';
import axios from 'axios';
import { useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
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

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
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
        <Image src={require("../../img/long_logo.png")} onClick={moveToMainPage} />
        <form onSubmit={searchHandler}>
          <TextField
            id="outlined-start-adornment"
            sx={{ m: 1, width: '25ch' }}
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
        <MenuIcon />
      </header>
    </>
  );
}

export default Header;