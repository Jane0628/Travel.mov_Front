import React, { useState } from 'react';
import '../../design/intro.scss';
import { Box, Button, Link } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import Login from '../user/Login';


const Intro = () => {

  const [isOpen, setIsOpen] = useState(false);

  const openLoginPage = e => {
    e.preventDefault();
    e.target.style = 'display: none';

    setIsOpen(true);
  }

  const textChange = e => {
    e.target.textContent = '떠나볼까?';
  }
  const returnText = e => {
    e.target.textContent = 'Tramovel'
  }
  return (
    <>
      <div className='position'>
        <Button href='/login'
          type='button'
          variant='contained'
          color='primary'
          onMouseEnter={textChange} onMouseLeave={returnText} onClick={openLoginPage}
        > Tramovel
        </Button>
        <Carousel fade>
          <Carousel.Item>
            {/* 기생충 */}
            <img
              className="w-100 bottom-cut-off"
              src={require("../../img/carousel_img/parasite.jpg")}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            {/* 어바웃 타임 */}
            <img
              className="w-100"
              src={require("../../img/carousel_img/about_time.jpg")}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            {/* 부산행 */}
            <img
              className="w-100 bottom-cut-off"
              src={require("../../img/carousel_img/train_to_busan.jpg")}
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            {/* 아바타 물의 길 */}
            <img
              className="w-100"
              src={require("../../img/carousel_img/avatar.jpg")}
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            {/* 범죄도시3 */}
            <img
              className="w-100"
              src={require("../../img/carousel_img/the_round_up.jpg")}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            {/* 미션 임파서블 */}
            <img
              className="w-100 bottom-cut-off"
              src={require("../../img/carousel_img/mission_impossible.jpg")}
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            {/* 살인의 추억 */}
            <img
              className="w-100 bottom-cut-off"
              src={require("../../img/carousel_img/memories_of_murder.jpg")}
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            {/* 라라랜드 */}
            <img
              className="w-100"
              src={require("../../img/carousel_img/lala.jpg")}
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            {/* 헤어질 결심 */}
            <img
              className="w-100 bottom-cut-off"
              src={require("../../img/carousel_img/decision_to_leave.jpg")}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
        <div id="loginPage" className={(isOpen ? 'open' : '')}>
          <Login />
        </div>
      </div>
    </>
  )
};

export default Intro;