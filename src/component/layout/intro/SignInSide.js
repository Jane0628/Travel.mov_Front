import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Carousel } from 'react-bootstrap';
import '../../../design/intro.scss';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import KakaoSignin from '../../../util/KakaoSignin';


export default function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      id: data.get('id'),
      password: data.get('password'),
    });
  };

  const [showPassword, setShowPassword] = React.useState(false);

  // 눈 클릭 시 비밀번호 보여주는/숨기는 메서드
  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={4}
        md={7}>

        <Carousel fade>
          <Carousel.Item>
            <img
              src={require("../../../img/carousel_img/parasite.jpg")}
              alt="기생충"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={require("../../../img/carousel_img/about_time.jpg")}
              alt="어바웃 타임"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={require("../../../img/carousel_img/train_to_busan.jpg")}
              alt="부산행"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={require("../../../img/carousel_img/avatar.jpg")}
              alt="아바타2 물의 길"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={require("../../../img/carousel_img/the_round_up.jpg")}
              alt="범죄도시3"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={require("../../../img/carousel_img/mission_impossible.jpg")}
              alt="미션 임파서블"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={require("../../../img/carousel_img/memories_of_murder.jpg")}
              alt="살인의 추억"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={require("../../../img/carousel_img/lala.jpg")}
              alt="라라랜드"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={require("../../../img/carousel_img/decision_to_leave.jpg")}
              alt="헤어질 결심"
            />
          </Carousel.Item>
        </Carousel>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="id"
              label="아이디"
              name="id"
              autoFocus
            />
            <FormControl fullWidth variant="outlined" size='small'>
              <InputLabel>비밀번호</InputLabel>
              <OutlinedInput
                autoComplete="off"
                id="pw"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={showPasswordHandler}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="아이디 저장"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>
            <KakaoSignin />
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  비밀번호를 잊으셨나요?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/join" variant="body2">
                  {"회원가입"}
                </Link>
              </Grid>
            </Grid>
            
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}