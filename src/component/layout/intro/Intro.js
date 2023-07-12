import React, { useState } from 'react';
import '../../../design/intro.scss';
import { Box, Button, Link } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Login from '../../user/Login';

const Intro = () => {

  // 버튼 텍스트 변환
  const textChange = e => {
    e.target.textContent = '떠나볼까?';
  }
  const returnText = e => {
    e.target.textContent = 'Tramovel'
  }

  const [close, setClose] = useState(false);

  // 버튼 클릭 시 open 값 변경
  const openLoginPage = e => {
    if (document.getElementById('loginPage').classList.contains('close')) setClose(true);
    else setClose(false);
  }

  return (
    <>
      <div className='position'>
        <Button
          id='openLogin'
          className={(close ? 'login-opened' : '')}
          type='button'
          variant='contained'
          color='primary'
          onMouseEnter={textChange} onMouseLeave={returnText} onClick={openLoginPage}
        > Tramovel
        </Button>
        <Carousel fade>
          <Carousel.Item>
            <img
              className={"bottom-cut-off " + (close ? 'login-opened' : '')}
              src={require("../../../img/carousel_img/parasite.jpg")}
              alt="기생충"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className={(close ? 'login-opened' : '')}
              src={require("../../../img/carousel_img/about_time.jpg")}
              alt="어바웃 타임"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className={"bottom-cut-off " + (close ? 'login-opened' : '')}
              src={require("../../../img/carousel_img/train_to_busan.jpg")}
              alt="부산행"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className={(close ? 'login-opened' : '')}
              src={require("../../../img/carousel_img/avatar.jpg")}
              alt="아바타2 물의 길"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className={(close ? 'login-opened' : '')}
              src={require("../../../img/carousel_img/the_round_up.jpg")}
              alt="범죄도시3"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className={"bottom-cut-off " + (close ? 'login-opened' : '')}
              src={require("../../../img/carousel_img/mission_impossible.jpg")}
              alt="미션 임파서블"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className={"bottom-cut-off " + (close ? 'login-opened' : '')}
              src={require("../../../img/carousel_img/memories_of_murder.jpg")}
              alt="살인의 추억"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className={(close ? 'login-opened' : '')}
              src={require("../../../img/carousel_img/lala.jpg")}
              alt="라라랜드"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className={"bottom-cut-off " + (close ? 'login-opened' : '')}
              src={require("../../../img/carousel_img/decision_to_leave.jpg")}
              alt="헤어질 결심"
            />
          </Carousel.Item>
        </Carousel>
        <div id="loginPage" className={(close ? '' : 'close')}>
          <Login />
        </div>
      </div>
    </>
  )
};

export default Intro;