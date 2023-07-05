import { Button, Checkbox, Container, FormControlLabel, Grid, TextField } from '@mui/material';
import logo from '../img/logo.png';
import '../design/join.scss'
import React from 'react'

const Join = () => {

  const joinHandler = e => {

  }

  return (
    <>
      <Container>
        <img src= {logo} alt="logo"/>
        <span>Join Page</span>
        <form noValidate onSubmit={joinHandler}>
          <Grid>
            <h2>ID</h2>
            <Grid item xs={8}>
                  <TextField 
                      variant="outlined"
                      required
                      fullWidth
                      id="id"
                      name="id"
                  />
            </Grid>
          </Grid>
          <Grid>
            <h2>PW</h2>
            <Grid item xs={8}>
                  <TextField 
                      variant="outlined"
                      required
                      fullWidth
                      id="pw"
                      name="pw"
                  />
            </Grid>
          </Grid>
          <Grid>
            <h2>NickN</h2>
            <Grid item xs={8}>
                  <TextField 
                      variant="outlined"
                      required
                      fullWidth
                      id="nickN"
                      name="nickN"
                  />
            </Grid>
          </Grid>
          <Grid>
            <h2>Email</h2>
            <Grid item xs={8}>
                  <TextField 
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      name="email"
                      autoComplete="email"
                  />
            </Grid>
          </Grid>
          <Grid>
            <h2>선호하는 영화 장르</h2>
            <FormControlLabel control={<Checkbox/>} label="액션" />
            <FormControlLabel control={<Checkbox/>} label="공포" />
            <FormControlLabel control={<Checkbox/>} label="로맨스" />
            <FormControlLabel control={<Checkbox/>} label="코미디" />
            <FormControlLabel control={<Checkbox/>} label="뮤지컬" />
            <FormControlLabel control={<Checkbox/>} label="판타지" />
            <FormControlLabel control={<Checkbox/>} label="모험" />
            <FormControlLabel control={<Checkbox/>} label="SF" />
            <FormControlLabel control={<Checkbox/>} label="애니메이션" />
          </Grid>
          <Grid item xs={8}>
                <Button 
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                > 가입할래요
                </Button>
          </Grid>
          <Grid item xs={8}>
                <Button href='/login'
                    type='button'
                    fullWidth
                    variant='contained'
                    color='primary'
                > 가입안할래요
                </Button>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default Join;