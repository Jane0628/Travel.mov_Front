import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import '../../design/join.scss'
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Copyright, Visibility, VisibilityOff } from '@mui/icons-material';
import AuthContext from '../../util/AuthContext';
import { API_BASE_URL, USER } from '../../util/host-utils';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Join = () => {

  const redirection = useNavigate();

  const { onLogin, isLoggedIn } = useContext(AuthContext);

  const REQUEST_URL = API_BASE_URL + USER;

  //mui Copyright
  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://Tramovel.com/">
          Tramovel.com
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  useEffect(() => {
    if (isLoggedIn) {
      redirection('/');
    }
  });

  //회원가입 요청 함수
  const fetchJoin = async () => {

    const $id = document.getElementById('id');
    const $pw = document.getElementById('pw');
    const $nick = document.getElementById('nick');
    const $email = document.getElementById('email');

    console.log($id.value);

    const res = await fetch(REQUEST_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        id: $id.value,
        pw: $pw.value,
        nick: $nick.value,
        email: $email.value
      })
    });

    //잘못된 요청시 경고창 띄움
    if (res.status === 400) {
      const text = await res.text();
      alert(text);
      return;
    }
    if (res.status === 200) {
      alert('회원가입에 성공했습니다.');
      redirection('/login');
    }

  }
  //아이디 중복체크 유무
  const [check, setCheck] = useState(false);

  //상태변수로 회원가입 입력값 관리
  const [userValue, setUserValue] = useState({
    id: '',
    password: '',
    nickN: '',
    email: ''
  });

  //검증 메세지에 대한 상태변수 관리
  const [message, setMessage] = useState({
    id: '',
    password: '',
    nickN: '',
    email: ''
  });

  //검증 완료 체크에 대한 상태변수 관리
  const [correct, setCorrect] = useState({
    id: false,
    password: false,
    nickN: false,
    email: false
  });

  //검증 데이터를 상태변수에 저장하는 함수
  const saveInputState = ({ key, inputVal, flag, msg }) => {

    inputVal !== 'pass' && setUserValue({
      ...userValue,
      [key]: inputVal
    });

    setCorrect({
      ...correct,
      [key]: flag
    });

    setMessage({
      ...message,
      [key]: msg
    });
  }

  //아이디 중복 체크
  const fetchIdCheck = () => {

    //아이디 검증 실패시
    if (!correct.id) {
      alert('아이디를 먼저 올바르게 입력해주세요');
      return;
    }
    let msg, flag = false;
    const id = document.getElementById('id').value
    fetch(`${REQUEST_URL}/check?id=${id}`)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
      }).then(json => {
        console.log(json);
        if (json) {
          msg = '이미 사용중인 아이디 입니다!'
        } else {
          msg = '사용 가능한 아이디 입니다.';
          flag = true;
        }
        setUserValue({ ...userValue, id: id });
        setMessage({ ...message, id: msg });
        setCheck(flag);
        console.log('check =' + check);
      })
      .catch(error => {
        console.log('서버와 통신이 원활하지 않습니다.');
      });

  }

  //아이디 입력창 체인지 이벤트 핸들러
  const idHandler = e => {
    const idRegex = /^[a-z0-9\.\-_]{4,10}$/;

    const inputVal = e.target.value;

    //아이디 변경시 중복체크초기화
    setCheck(false);
    setCorrect(false);

    let msg, flag = false;
    if (!inputVal) {
      msg = '아이디는 필수값입니다.';
    } else if (!idRegex.test(inputVal)) {
      msg = '4~10자리 영문과 숫자로 입력해주세요';
    } else if (!check) {
      msg = '아이디 중복체크 버튼을 클릭하세요';
      flag = true;
      setCorrect({ ...correct, id: flag });
    } else {
    }

    saveInputState({
      key: 'id',
      inputVal,
      msg,
      flag
    });
  };

  //패스워드 입력창 체인지 이벤트 핸들러
  const passwordHandler = e => {

    const inputVal = e.target.value;

    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

    let msg, flag = false;
    if (!inputVal) { //비밀번호 안적음
      msg = '비밀번호는 필수입니다.';
    } else if (!pwRegex.test(inputVal)) {
      msg = '8~20글자 영문, 숫자, 특수문자를 포함해 주세요.';
    } else {
      msg = '사용 가능한 비밀번호입니다.';
      flag = true;
      setCorrect({ ...correct, password: flag });
    }

    saveInputState({
      key: 'password',
      inputVal,
      msg,
      flag
    });
  };

  //닉네임 입력창 체인지 이벤트 핸들러
  const nameHandler = e => {

    const nameRegex = /^[가-힣a-z0-9]{2,10}$/;

    const inputVal = e.target.value;

    let msg, flag = false;

    if (!inputVal) {
      msg = '닉네임은 필수입니다.';
    } else if (!nameRegex.test(inputVal)) {
      msg = '2~10글자로 작성하세요!';
    } else {
      msg = '사용 가능한 닉네임입니다.';
      flag = true;
    }

    setMessage({ ...message, nickN: msg });
    setUserValue({ ...userValue, nickN: inputVal });
    setCorrect({ ...correct, nickN: flag });

    saveInputState({
      key: 'nickN',
      inputVal,
      msg,
      flag
    });
  };

  //이메일 입력창 체인지 이벤트 핸들러
  const emailHandler = e => {

    const inputVal = e.target.value;

    const emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    let msg, flag = false;
    if (!inputVal) {
      msg = '이메일은 필수값입니다.';
    } else if (!emailRegex.test(inputVal)) {
      msg = '이메일 형식이 아닙니다.';
    } else {
      msg = '사용가능한 이메일입니다.'
      flag = true;
      setCorrect({ ...correct, email: flag });
    }
    saveInputState({
      key: 'email',
      inputVal,
      msg,
      flag
    });

  };

  //4개의 입력칸이 모두 검증에 통과했는지 여부를 검사
  const isValid = () => {
    for (const key in correct) {
      const flag = correct[key];
      if (!flag) return false;
    }
    return true;
  }

  //회원가입 버튼 클릭시 이벤트
  const joinHandler = e => {
    e.preventDefault();
    if (!check) {
      alert('아이디 중복체크를 해주세요');
      return;
    }
    if (isValid()) {
      fetchJoin();
    } else {
      alert('입력란을 다시 확인해 주세요')
    }

  }

  const [showPassword, setShowPassword] = useState(false);

  // 눈 클릭 시 비밀번호 보여주는/숨기는 메서드
  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box component="form" noValidate onSubmit={joinHandler} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="id"
                  name="id"
                  required
                  fullWidth
                  id="id"
                  label="아이디"
                  onChange={idHandler}
                  autoFocus
                />
              <button type='button' onClick={fetchIdCheck} className='check-btn'>중복체크</button>
              </Grid>
              <span style={
                correct.id ? { color: 'green' } : { color: 'red' }
                }>{message.id}
              </span>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="nick"
                  label="닉네임"
                  name="nick"
                  autoComplete="nick"
                  onChange={nameHandler}
                />
              </Grid>
              <span style={
                correct.nickN ? { color: 'green' } : { color: 'red' }
                }>{message.nickN}
              </span>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="이메일 주소"
                  name="email"
                  autoComplete="email"
                  onChange={emailHandler}
                />
              </Grid>
              <span style={
                correct.email ? { color: 'green' } : { color: 'red' }
                }>{message.email}
              </span>
              {/* <Grid item xs={12}>

                <TextField
                  required
                  fullWidth
                  name="pw"
                  label="비밀번호"
                  type="password"
                  id="pw"
                  autoComplete="new-password"
                />
              </Grid> */}
              <Grid item xs={12}>
              <FormControl sx={{ width: '500px' }} variant="outlined" required size='Large'>
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
                  label="비밀번호"
                  onChange={passwordHandler}
                  name="pw"
                />
              </FormControl>
              <span style={
                correct.password ? { color: 'green' } : { color: 'red' }
                }>{message.password}
              </span>
              </Grid>
              
              <Grid>
              <h2>선호하는 영화 장르</h2>
                <FormControlLabel control={<Checkbox />} label="액션" />
                <FormControlLabel control={<Checkbox />} label="공포" />
                <FormControlLabel control={<Checkbox />} label="로맨스" />
                <FormControlLabel control={<Checkbox />} label="코미디" />
                <FormControlLabel control={<Checkbox />} label="뮤지컬" />
                <FormControlLabel control={<Checkbox />} label="판타지" />
                <FormControlLabel control={<Checkbox />} label="모험" />
                <FormControlLabel control={<Checkbox />} label="SF" />
                <FormControlLabel control={<Checkbox />} label="애니메이션" />
              </Grid>          
            </Grid>
            <div className="buttons">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              가입할래요
            </Button>
            <Button href='/login'
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              가입안할래요
            </Button>
            </div>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>

  
    </>
  );
};



export default Join;