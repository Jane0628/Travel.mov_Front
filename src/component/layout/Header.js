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

const Header = () => {

  const { isLoggedIn, onLogout, onLogin, nick } = useContext(AuthContext);

  const redirection = useNavigate();

  const moveToMainPage = () => {
    redirection('/');
  }

  const logoutHandler = e => {
    e.preventDefault();
    alert('로그아웃 되었습니다.');
    onLogout();
    redirection('/');
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
  const [state, setState] = useState({
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
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <Image src={localStorage.getItem('LOGIN_USER_PFP') ? localStorage.getItem('LOGIN_USER_PFP') : require('../../img/profileImage.png')} width={'80px'} />
          <ListItemText primary={localStorage.getItem('LOGIN_USER_NICK') ? `${localStorage.getItem('LOGIN_USER_NICK')}님` : '로그인 후 이용해주세요.'} sx={{ marginLeft: '20px' }} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {localStorage.getItem('LOGIN_USER_NICK')
          ?
          (
            <>
              <ListItem>
                <Link to={'/'} onClick={logoutHandler} style={{ color: '#424180', display: 'flex', alignItems: 'center' }}>
                  <ListItemIcon>
                    <OutputOutlinedIcon color='primary' />
                  </ListItemIcon>
                  로그아웃
                </Link>
              </ListItem>
              <ListItem>
                <Link to={'/myPage'} style={{ color: '#424180', display: 'flex', alignItems: 'center' }}>
                  <ListItemIcon>
                    <PersonIcon color='primary' />
                  </ListItemIcon>
                  마이페이지
                </Link>
              </ListItem>
            </>
          )
          :
          (
            <>
              <ListItem>
                <Link to={'/login'} style={{ color: '#424180', display: 'flex', alignItems: 'center' }}>
                  <ListItemIcon>
                    <LockOutlinedIcon color='primary' />
                  </ListItemIcon>
                  로그인
                </Link>
              </ListItem>
              <ListItem>
                <Link to={'/join'} style={{ color: '#424180', display: 'flex', alignItems: 'center' }}>
                  <ListItemIcon>
                    <AssignmentIcon color='primary' />
                  </ListItemIcon>
                  회원가입
                </Link>
              </ListItem>
            </>
          )
        }
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
          <form onSubmit={searchHandler} autocomplete="off">
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