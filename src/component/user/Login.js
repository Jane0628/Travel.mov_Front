import React, { useContext, useEffect, useState } from 'react';
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
import '../../design/login.scss';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../util/AuthContext';
import { API_BASE_URL, USER } from '../../util/host-utils';
import KakaoSignin from '../kakao/KakaoSignin';
import { isLogin } from '../../util/login-utils';

// 캐러셀에 꼭 필요합니다. 지우지 말아주세요!
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createTheme } from '@mui/material/styles';


export default function SignInSide() {
  const redirection = useNavigate();

  const { onLogin, isLoggedIn } = useContext(AuthContext);

  const REQUEST_URL = API_BASE_URL + USER;

  // 로그인 중일 시 메인으로
  useEffect(() => {
    if (isLoggedIn) {
      alert('이미 로그인 중입니다.');
      redirection('/');
    }
  });

  // 로그인 요청 함수
  const fetchLogin = async () => {

    const $id = document.getElementById('id');
    const $pw = document.getElementById('pw');

    if (!$id.value) {
      alert('아이디를 입력하세요');
      return;
    }
    if (!$pw.value) {
      alert('비밀번호를 입력하세요!')
      return;
    }

    const res = await fetch(`${REQUEST_URL}/signin`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        id: $id.value,
        pw: $pw.value
      })
    });

    if (res.status === 400) {
      const text = await res.text();
      alert(text);
      return;
    }

    const { token, nick } = await res.json();

    onLogin(token, nick);
    redirection('/');
  };

  // 로그인 버튼 클릭 이벤트
  const loginHandler = e => {
    e.preventDefault();
    fetchLogin();
  };

  const [showPassword, setShowPassword] = React.useState(false);

  // 눈 클릭 시 비밀번호 보여주는/숨기는 메서드
  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  // 반응형
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      }
    }
  });

  // 카카오 로그인
  const [user, setUser] = useState(null);
  const [loggedin, setLoggedIn] = useState(false);
  const { Kakao } = window;

  const initKakao = async () => {
    const jsKey = `${process.env.REACT_APP_KAKAOMAP_API_KEY}`;
    if (Kakao && !Kakao.isInitialized()) {
      await Kakao.init(jsKey);
      console.log(`kakao 초기화 ${Kakao.isInitialized()}`);
    }
  };

  const kakaoLogin = async () => {
    await Kakao.Auth.login({
      success(res) {
        console.log(res);
        Kakao.Auth.setAccessToken(res.access_token);
        console.log("카카오 로그인 성공");

        Kakao.API.request({
          url: "/v2/user/me",
          success(res) {
            console.log("카카오 인가 요청 성공");
            setLoggedIn(true);
            const kakaoAccount = res.kakao_account;
            localStorage.setItem("email", kakaoAccount.email);
            localStorage.setItem(
              "profileImg",
              kakaoAccount.profile.profile_image_url
            );
            localStorage.setItem("nickname", kakaoAccount.profile.nickname);
          },
          fail(error) {
            console.log(error);
          },
        });
      },
      fail(error) {
        console.log(error);
      },
    });
  };

  const kakaoLogout = () => {
    Kakao.Auth.logout((res) => {
      console.log(Kakao.Auth.getAccessToken());
      console.log(res);
      localStorage.removeItem("email");
      localStorage.removeItem("profileImg");
      localStorage.removeItem("nickname");
      setUser(null);
    });
  };

  useEffect(() => {
    initKakao();
    Kakao.Auth.getAccessToken() ? setLoggedIn(true) : setLoggedIn(false);
  }, []);

  useEffect(() => {
    console.log(loggedin);
    if (loggedin) {
      setUser({
        email: localStorage.getItem("email"),
        profileImg: localStorage.getItem("profileImg"),
        nickname: localStorage.getItem("nickname"),
      });
    }
  }, [loggedin]);

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
              src={require("../../img/carousel_img/parasite.jpg")}
              alt="기생충"
            />
            <Carousel.Caption>
              <img className='logo' src={require("../../img/carousel_logo/parasite.png")} alt="기생충" />
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={require("../../img/carousel_img/about_time.jpg")}
              alt="어바웃 타임"
            /><Carousel.Caption>
              <img className='logo' src={require("../../img/carousel_logo/about_time.png")} alt="어바웃 타임" />
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={require("../../img/carousel_img/train_to_busan.jpg")}
              alt="부산행"
            /><Carousel.Caption>
              <img className='logo' src={require("../../img/carousel_logo/train_to_busan.png")} alt="부산행" />
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={require("../../img/carousel_img/avatar.jpg")}
              alt="아바타2 물의 길"
            /><Carousel.Caption>
              <img className='logo' src={require("../../img/carousel_logo/avatar.png")} alt="아바타" />
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='align_right'
              src={require("../../img/carousel_img/the_round_up.jpg")}
              alt="범죄도시3"
            /><Carousel.Caption>
              <img className='logo' src={require("../../img/carousel_logo/the_round_up.png")} alt="범죄도시3" />
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={require("../../img/carousel_img/mission_impossible.jpg")}
              alt="미션 임파서블"
            /><Carousel.Caption>
              <img className='logo' src={require("../../img/carousel_logo/mission_impossible.png")} alt="미션 임파서블" />
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={require("../../img/carousel_img/memories_of_murder.jpg")}
              alt="살인의 추억"
            /><Carousel.Caption>
              <img className='logo' src={require("../../img/carousel_logo/memories_of_murder.png")} alt="살인의 추억" />
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={require("../../img/carousel_img/lala_land.jpg")}
              alt="라라랜드"
            /><Carousel.Caption>
              <img className='logo' src={require("../../img/carousel_logo/lala_land.png")} alt="라라랜드" />
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={require("../../img/carousel_img/decision_to_leave.jpg")}
              alt="헤어질 결심"
            /><Carousel.Caption>
              <img className='logo' src={require("../../img/carousel_logo/decision_to_leave.png")} alt="헤어질 결심" />
            </Carousel.Caption>
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
          <Box component="form" noValidate onSubmit={loginHandler} sx={{ mt: 1 }}>
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
                  회원가입
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}