import { Container, Grid } from '@mui/material'
import React from 'react'
import MainPagination from './MainPagination';
import Recommandation from './Recommandation';
import TodaysMovie from './TodaysMovie';

const Main = () => {
  return (
    <>
      <Container>
        <h1>오늘의 영화</h1>
        <TodaysMovie />
        <Recommandation />

        <div>
          <div>
            {/* 후기는 안할거지만 일단 만들어 뒀습니다. */}
            <h1>여행의 후기</h1>
            <div>icon</div>
          </div>
          <Grid item xs={2}>
            <img src={require("../../img/elemental.jpg")} alt="엘리멘탈" style={{ width: '110px' }} />
            <a href="#">어디어디 좋았어요</a>
            <span>닉네임:누구누구</span>
          </Grid>
          <Grid item xs={2}>
            <img src={require("../../img/elemental.jpg")} alt="엘리멘탈" style={{ width: '110px' }} />
            <a href="#">어디어디 좋았어요</a>
            <span>닉네임:누구누구</span>
          </Grid>
          <Grid item xs={2}>
            <img src={require("../../img/elemental.jpg")} alt="엘리멘탈" style={{ width: '110px' }} />
            <a href="#">어디어디 좋았어요</a>
            <span>닉네임:누구누구</span>
          </Grid>
          <Grid item xs={2}>
            <img src={require("../../img/elemental.jpg")} alt="엘리멘탈" style={{ width: '110px' }} />
            <a href="#">어디어디 좋았어요</a>
            <span>닉네임:누구누구</span>
          </Grid>
          <MainPagination />
        </div>
      </Container>
    </>
  );
}

export default Main;
