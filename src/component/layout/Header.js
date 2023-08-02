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

// 아코디언
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import RateReviewIcon from '@mui/icons-material/RateReview';
import HotelIcon from '@mui/icons-material/Hotel';

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

  ////////// 햄버거 //////////
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

  ////////// 아코디언 //////////
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    '&:before': {
      display: 'none',
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'light'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transition: '1s ease-in-out',
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));

  const list = (anchor) => (

    <Box
      sx={{ width: '400px' }}
    // onClick={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem sx={{ cursor: 'default' }}>
          <div style={{ borderRadius: '50%', overflow: 'hidden' }}>
            <Image src={localStorage.getItem('LOGIN_USER_PFP') ? localStorage.getItem('LOGIN_USER_PFP') : require('../../img/profileImage.png')} width={'80px'} />
          </div>

          <div style={{ height: '70px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginLeft: '20px' }}>
            {localStorage.getItem('LOGIN_USER_NICK') ?
              (
                <>
                  <p style={{ fontSize: '18px', margin: 0 }}>
                    <span style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>
                      {localStorage.getItem('LOGIN_USER_NICK')}
                    </span>
                    님
                  </p>
                  <Button style={{ backgroundColor: '#b1bff9', color: 'white', width: '80px', height: '30px', fontSize: '15px' }} onClick={logoutHandler}>로그아웃</Button>
                </>
              ) : (
                <p>
                  로그인 후 이용해주세요.
                </p>
              )
            }
          </div>
        </ListItem>
      </List>
      <Divider />
      <List style={{ padding: 0, border: '0px' }}>
        {localStorage.getItem('LOGIN_USER_NICK')
          ?
          (<div style={{ transition: '5s ease-in-out' }}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Link to={'/myPage'} style={{ color: '#424180', display: 'flex', alignItems: 'center' }}>
                  <ListItemIcon>
                    <PersonIcon sx={{ width: '34.28px' }} color='primary' />
                  </ListItemIcon>
                  마이페이지
                </Link>
              </AccordionSummary>
              <AccordionDetails>
                {localStorage.getItem('isLoggedIn') == 1 ?
                  (
                    <ListItem>
                      <Link to={'/profile'} style={{ color: '#424180', display: 'flex', alignItems: 'center' }}>
                        <ListItemIcon>
                          <EditIcon color='primary' />
                        </ListItemIcon>
                        프로필 수정
                      </Link>
                    </ListItem>
                  ) : null
                }
                <ListItem>
                  <Link to={'/reservationCheck'} style={{ color: '#424180', display: 'flex', alignItems: 'center' }}>
                    <ListItemIcon>
                      <FactCheckIcon sx={{ width: '34.28px' }} color='primary' />
                    </ListItemIcon>
                    예약 정보 확인
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to={'/myfreeBoardList'} style={{ color: '#424180', display: 'flex', alignItems: 'center' }}>
                    <ListItemIcon>
                      <RateReviewIcon sx={{ width: '34.28px' }} color='primary' />
                    </ListItemIcon>
                    나의 여행 후기
                  </Link>
                </ListItem>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                <Link to={'/hotels'} style={{ color: '#424180', display: 'flex', alignItems: 'center' }}>
                  <ListItemIcon>
                    <HotelIcon sx={{ width: '34.28px' }} color='primary' />
                  </ListItemIcon>
                  호텔
                </Link>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                  sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                  sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                <Typography>Collapsible Group Item #3</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                  sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                  sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
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
            <>
              <Button onClick={toggleDrawer(anchor, true)}><MenuIcon /></Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </>
          ))}
        </div>
      </header>
    </>
  );
}

export default Header;