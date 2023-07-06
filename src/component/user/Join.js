import { Button, Checkbox, Container, FormControlLabel, Grid, TextField } from '@mui/material';
import '../../design/join.scss'
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const Join = () => {

  const redirection = useNavigate();

  //회원가입 요청 함수
  const fetchJoin = async() => {

    const $id = document.getElementById('id');
    const $pw = document.getElementById('pw');
    const $nickN = document.getElementById('nickN');
    const $email = document.getElementById('email');

    console.log($id.value);

    const res = await fetch('http://localhost:8181/api/auth/signup', {
        method: 'POST',
        headers: {'content-type' : 'application/json'},
        body: JSON.stringify({
            id: $id.value,
            pw: $pw.value,
            nickN: $nickN.value,
            email: $email.value
        })
    });

    //잘못된 요청시 경고창 띄움
    if(res.status === 400) {
        const text = await res.text();
        alert(text);
        return;
    }
    if(res.status === 200) {
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
  const saveInputState = ({key, inputVal, flag, msg}) => {
        
    inputVal !== 'pass' && setUserValue({
        ...userValue,
        [key] : inputVal
    });
    
    setCorrect({
        ...correct,
        [key] : flag
    });

    setMessage({
        ...message,
        [key] : msg
    });
  }

  //아이디 중복 체크
  const fetchIdCheck = () => {
    
    //아이디 검증 실패시
    if(!correct.id) {
      alert('아이디를 먼저 올바르게 입력해주세요');
      return;
    }
    setCheck(true);
    let msg , flag = false;
    const id = document.getElementById('id').value
    fetch(`http://localhost:8181/api/auth/check?id=${id}`)
      .then(res => {
        if(res.status === 200) {
          return res.json();
        }
      }).then(json => {
        console.log(json);
        if(json) {
          msg = '이미 사용중인 아이디 입니다!'
        } else {
          msg = '사용 가능한 아이디 입니다.';
          flag = true;
        }
        setUserValue({...userValue, id: id});
        setMessage({...message, id: msg});
        // setCheck(flag);
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
    if(!inputVal) {
      msg = '아이디는 필수값입니다.';
    } else if(!idRegex.test(inputVal)){
      msg = '4~10자리 영문과 숫자로 입력해주세요';
    } else if(!check){
      msg = '아이디 중복체크 버튼을 클릭하세요';
      flag = true;
      setCorrect({...correct, id:flag});
    } else {
    }

    saveInputState({
      key : 'id',
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
    if(!inputVal) { //비밀번호 안적음
        msg = '비밀번호는 필수입니다.';
    } else if(!pwRegex.test(inputVal)) {
        msg = '8~20글자 영문, 숫자, 특수문자를 포함해 주세요.';
    } else {
        msg = '사용 가능한 비밀번호입니다.';
        flag = true;
        setCorrect({...correct, pw:flag});
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

    if(!inputVal) {
        msg = '닉네임은 필수입니다.';
    } else if(!nameRegex.test(inputVal)) {
        msg = '2~10글자로 작성하세요!';
    } else {
        msg = '사용 가능한 닉네임입니다.';
        flag = true;
    }

    setMessage({...message, nickN: msg});
    setUserValue({...userValue, nickN : inputVal});
    setCorrect({...correct, nickN: flag});

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

    const emailRegex = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;

    let msg, flag = false;
    if(!inputVal) {
       msg = '이메일은 필수값입니다.';
    } else if(!emailRegex.test(inputVal)) {
       msg = '이메일 형식이 아닙니다.';
    } else {
       msg = '사용가능한 이메일입니다.'
       flag = true;
       setCorrect({...correct, email: flag});
    }
    saveInputState({
       key : 'email',
       inputVal,
       msg,
       flag
    });

  };

  //4개의 입력칸이 모두 검증에 통과했는지 여부를 검사
  const isValid = () => {
    for(const key in correct) {
        const flag = correct[key];
        if(!flag) return false;
    }
    return true;
  }

  //회원가입 버튼 클릭시 이벤트
  const joinHandler = e => {
    e.preventDefault();
    if(!check) {
      alert('아이디 중복체크를 해주세요');
      return;
    }
    if(isValid()) {
      fetchJoin();
    } else {
      alert('입력란을 다시 확인해 주세요')
    }
    
  }

  return (
    <>
      <Container>
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
                onChange={idHandler}
              />
            </Grid>
            <button type='button' onClick={ fetchIdCheck }>중복체크</button>
            <span style={
              correct.id ? {color : 'green'} : {color : 'red'}
            }>{message.id}</span>
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
                type='password'
                onChange={passwordHandler}
              />
            </Grid>
            <span style={
              correct.password ? {color : 'green'} : {color : 'red'}
            }>{message.password}</span>
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
                onChange={nameHandler}
              />
            </Grid>
            <span style={
              correct.nickN ? {color : 'green'} : {color : 'red'}
            }>{message.nickN}</span>
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
                onChange={emailHandler}
              />
            </Grid>
            <span style={
              correct.email ? {color : 'green'} : {color : 'red'}
            }>{message.email}</span>
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