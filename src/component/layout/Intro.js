import React, { useState } from 'react';
import '../../design/intro.scss';
import { Box, Link } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';


const Intro = () => {
  const textChange = e => {
    e.target.textContent = '떠나볼까?';
  }
  const returnText = e => {
    e.target.textContent = 'Tramovel'
  }
  return (
    <>
      <Link to='/Main' className='intro-title' onMouseEnter={textChange} onMouseLeave={returnText}>Tramovel</Link>
      <Carousel fade>
        <Carousel.Item>
          {/* 기생충 */}
          <img
            className="d-block w-100"
            src={require("../../img/parasite.jpg")}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          {/* 어바웃 타임 */}
          <img
            className="d-block w-100"
            src={require("../../img/about_time.jpg")}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          {/* 부산행 */}
          <img
            className="d-block w-100"
            src={require("../../img/train_to_busan.jpg")}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          {/* 아바타 물의 길 */}
          <img
            className="d-block w-100"
            src={require("../../img/avatar.jpg")}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          {/* 범죄도시3 */}
          <img
            className="d-block w-100"
            src={require("../../img/the_round_up.jpg")}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          {/* 미션 임파서블 */}
          <img
            className="d-block w-100"
            src={require("../../img/mission_impossible.jpg")}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          {/* 살인의 추억 */}
          <img
            className="d-block w-100"
            src={require("../../img/memories_of_murder.jpg")}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          {/* 라라랜드 */}
          <img
            className="d-block w-100"
            src={require("../../img/lala.jpg")}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          {/* 헤어질 결심 */}
          <img
            className="d-block w-100"
            src={require("../../img/decision_to_leave.jpg")}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </>
  )
};

export default Intro;