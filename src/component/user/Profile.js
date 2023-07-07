import React, { useRef, useState } from 'react'
import '../../design/profile.scss'
import { Grid, Button, TextField, InputLabel, OutlinedInput, InputAdornment, IconButton, FormControl, Input } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from 'reactstrap';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router';

const Profile = () => {

  const fileInputRef = useRef(null);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#7b8ce0',
      },
    },
  });

  const redirection = useNavigate();

  //회원가입 요청 함수
  const fetchJoin = async() => {    
    console.log(userValue.password);
    console.log(userValue.nickN);
    console.log(userValue.email);
    const res = await fetch('http://localhost:8181/api/auth/signup', {
      method: 'POST',
      headers: {'content-type' : 'application/json'},
      body: JSON.stringify({            
        id: userValue.id,
        pw: userValue.password,
        nickN: userValue.nickN,
        email: userValue.email
      })
    });
    
    
    //잘못된 요청시 경고창 띄움
    if(res.status === 400) {
        const text = await res.text();
        alert(text);
        return;
    }
  }

  


  //상태변수로 회원가입 입력값 관리
  const [userValue, setUserValue] = useState({
    password: '',
    nickN: '',
    email: ''
  });

  //검증 메세지에 대한 상태변수 관리
  const [message, setMessage] = useState({
    password: '',
    nickN: '',
    email: ''
  });

  //검증 완료 체크에 대한 상태변수 관리
  const [correct, setCorrect] = useState({
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

  const [showPassword, setShowPassword] = useState(false);

	// 눈 클릭 시 비밀번호 보여주는/숨기는 메서드
	const showPasswordHandler = () => {
		setShowPassword(!showPassword);
	};

  // 이미지
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = e => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
  };

  const isValid = () => {

    for(const key in correct) {
        const flag = correct[key];
        if(!flag) return false;
    }
    return true;
  }

  const fetchSignUpPost = () => {
    const userJsonBlob = new Blob(
        [JSON.stringify(userValue)],
        {type: 'application/json'}
    );

    const userFormData = new FormData();
    userFormData.append('user', userJsonBlob);
    userFormData.append('profileImage', fileInputRef.current.files[0]);

    fetch('API_BASE_URL', {
        method: 'POST',
        body: userFormData
    })
    .then(res => {
        if(res.status === 200) {
            alert('수정이 완료되었습니다');
            redirection('/myPage');
        } else {
            alert('서버와의 통신이 원활하지 않습니다.');
        }
    })
}

  const handleFormSubmit = e => {
    e.preventDefault();
  
    // password, nickN, email 값 가져오기
    const passwordValue = document.getElementById('outlined-adornment-password').value;
    const nickNValue = document.getElementById('nick').value;
    const emailValue = document.getElementById('email').value;
  
    // 가져온 값 사용 또는 처리
    console.log('Password:', passwordValue);
    console.log('NickName:', nickNValue);
    console.log('Email:', emailValue);

    if(isValid()) {
      fetchSignUpPost();
      } else {
          alert('입력란을 다시 확인해 주세요!');
      }
  
  };

  


  return (
    <>
      <Container>
        <form>
        <h1>프로필 수정</h1>
        <div className='prof-main'>
          <div className='image'>
            {/* <Grid item xs={8}>
              <img
                src={require("../../img/profileImage.png") }
                alt="profile"
              />
            </Grid> */}
            <div>
              <img src={selectedImage ? selectedImage : require("../../img/profileImage.png")} alt="" />
              <label htmlFor="fileInput-hidden" className="file-label">
                프로필 이미지 선택
                <input id="fileInput-hidden" type="file" onChange={handleImageChange} accept="image/*" className="file-input" ref={fileInputRef} />
              </label>
            </div>
          </div>
          <div className='profile'>
            <div className="right">
              <Grid item xs={8}>
                <TextField
                  type="text"
                  required
                  fullWidth
                  id="id"
                  label="아이디"
                  name="id"
                  value={'SimChung2'}
                  readOnly
                />
              </Grid>            
              <Grid item xs={8}>
                <FormControl sx={{ width: '400px' }} variant="outlined" required fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">비밀번호</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                          onClick={showPasswordHandler}
                          >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="비밀번호"
                    onChange={passwordHandler}
                    />
                </FormControl>
                <span style={
                correct.password ? {color : 'green'} : {color : 'red'}
                }>{message.password}</span>     
              </Grid>
              <Grid item xs={8}>
                <TextField
                  variant="outlined"
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
              correct.nickN ? {color : 'green'} : {color : 'red'}
              }>{message.nickN}</span>    
              <Grid item xs={8}>
              <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="이메일"
                  name="email"
                  autoComplete="email"
                  onChange={emailHandler}
                />
              </Grid>            
              <span style={
              correct.email ? {color : 'green'} : {color : 'red'}
              }>{message.email}</span>
            </div>
              <div className='change'>
              <ThemeProvider theme={theme}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleFormSubmit}
              > 변경할래요
              </Button>
              </ThemeProvider>
              </div>
              <div className='no-change'>
              <ThemeProvider theme={theme}>
                <Button href='/mypage'
                  type='button'
                  fullWidth
                  variant='contained'
                  color='primary'
                > 변경안해요
                </Button>
              </ThemeProvider>
              </div>
          </div>
        </div>
        </form>
      </Container>
    </>
  )
}

export default Profile