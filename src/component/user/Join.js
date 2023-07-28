import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import "../../design/join.scss";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Copyright, Visibility, VisibilityOff } from "@mui/icons-material";
import AuthContext from "../../util/AuthContext";
import { API_BASE_URL, USER } from "../../util/host-utils";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Header from "../layout/Header";

const Join = () => {
  const redirection = useNavigate();

  const { onLogin, isLoggedIn } = useContext(AuthContext);

  const REQUEST_URL = API_BASE_URL + USER;

  useEffect(() => {
    if (isLoggedIn) {
      alert("이미 로그인 중이십니다.");
      redirection("/");
    }
  });

  //회원가입 요청 함수
  const fetchJoin = async () => {
    const $id = document.getElementById("id");
    const $pw = document.getElementById("pw");
    const $nick = document.getElementById("nick");
    const $email = document.getElementById("email");

    console.log($id.value);

    const res = await fetch(REQUEST_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: $id.value,
        pw: $pw.value,
        nick: $nick.value,
        email: $email.value,
      }),
    });

    //잘못된 요청시 경고창 띄움
    if (res.status !== 200) {
      const text = await res.text();
      alert(text);
      return;
    }
    if (res.status === 200) {
      alert("회원가입에 성공했습니다.");
      alert("10000원 쿠폰이 지급되었습니다. (사용기한 7일)");
      redirection("/login");
    }
  };
  //아이디 중복체크 유무
  const [idCheck, setIdCheck] = useState(false);

  //상태변수로 회원가입 입력값 관리
  const [userValue, setUserValue] = useState({
    id: "",
    pw: "",
    nick: "",
    email: "",
  });

  //검증 메세지에 대한 상태변수 관리
  const [message, setMessage] = useState({
    id: "",
    pw: "",
    nick: "",
    email: "",
  });

  //검증 완료 체크에 대한 상태변수 관리
  const [correct, setCorrect] = useState({
    id: 0,
    pw: 0,
    nick: 0,
    email: 0,
  });

  //검증 데이터를 상태변수에 저장하는 함수
  const saveInputState = ({ key, inputVal, verification, msg }) => {
    inputVal !== "pass" &&
      setUserValue({
        ...userValue,
        [key]: inputVal,
      });

    setCorrect({
      ...correct,
      [key]: verification,
    });

    setMessage({
      ...message,
      [key]: msg,
    });
  };

  // 아이디 중복 체크
  const fetchIdCheck = () => {
    const id = document.getElementById("id");

    //아이디 검증 실패시
    if (correct.id !== 3) {
      alert("올바른 아이디를 입력해주세요.");
      id.focus();
      return;
    }

    let msg, flag, verification;
    fetch(`${REQUEST_URL}/check?id=${id.value}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((json) => {
        console.log(json);
        if (json) {
          msg = "이미 사용중인 아이디입니다.";
          id.focus();
          verification = 1;
          flag = false;
        } else {
          alert("사용 가능한 아이디입니다.");
          verification = 2;
          flag = true;
        }

        setCorrect({ ...correct, id: verification });
        setUserValue({ ...userValue, id: id });
        setMessage({ ...message, id: msg });
        setIdCheck(flag);
      })
      .catch((error) => {
        console.log("서버와 통신이 원활하지 않습니다.");
      });
  };

  // 아이디 입력창 체인지 이벤트 핸들러
  const idHandler = (e) => {
    const inputVal = e.target.value;

    const idRegex = /^[a-z0-9\.\-_]{4,10}$/;

    // 아이디 변경 시 중복 체크 초기화
    setIdCheck(false);
    setCorrect(false);

    let msg;
    let verification = 0;
    if (!inputVal) {
      msg = "아이디는 필수값입니다.";
      verification = 1;
    } else if (!idRegex.test(inputVal)) {
      msg = "4~10자리 영문과 숫자로 입력해주세요";
      verification = 1;
    } else if (!idCheck) {
      msg = "아이디 중복체크 버튼을 클릭하세요";
      verification = 3;
      setCorrect({ ...correct, id: verification });
    }

    saveInputState({
      key: "id",
      inputVal,
      msg,
      verification,
    });
  };

  //패스워드 입력창 체인지 이벤트 핸들러
  const passwordHandler = (e) => {
    const inputVal = e.target.value;

    const pwRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

    let msg, verification;
    if (!inputVal) {
      //비밀번호 안적음
      msg = "비밀번호는 필수입니다.";
      verification = 1;
    } else if (!pwRegex.test(inputVal)) {
      msg = "8~20글자 영문, 숫자, 특수문자를 포함해 주세요.";
      verification = 1;
    } else {
      msg = "사용 가능한 비밀번호입니다.";
      verification = 2;
      setCorrect({ ...correct, password: verification });
    }

    saveInputState({
      key: "pw",
      inputVal,
      msg,
      verification,
    });
  };

  //닉네임 입력창 체인지 이벤트 핸들러
  const nameHandler = (e) => {
    const inputVal = e.target.value;

    const nameRegex = /^[ㄱ-ㅎ가-힣a-z0-9]{2,10}$/;

    let msg, verification;
    if (!inputVal) {
      msg = "닉네임은 필수입니다.";
      verification = 1;
    } else if (!nameRegex.test(inputVal)) {
      msg = "2~10글자로 작성하세요!";
      verification = 1;
    } else {
      msg = "사용 가능한 닉네임입니다.";
      verification = 2;
    }

    setMessage({ ...message, nickN: msg });
    setUserValue({ ...userValue, nickN: inputVal });
    setCorrect({ ...correct, nickN: verification });

    saveInputState({
      key: "nick",
      inputVal,
      msg,
      verification,
    });
  };

  //이메일 입력창 체인지 이벤트 핸들러
  const emailHandler = (e) => {
    const inputVal = e.target.value;

    const emailRegex =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    let msg, verification;
    if (!inputVal) {
      msg = "이메일은 필수값입니다.";
      verification = 1;
    } else if (!emailRegex.test(inputVal)) {
      msg = "이메일 형식이 아닙니다.";
      verification = 1;
    } else {
      msg = "사용가능한 이메일입니다.";
      verification = 2;
      setCorrect({ ...correct, email: verification });
    }
    saveInputState({
      key: "email",
      inputVal,
      msg,
      verification,
    });
  };

  //4개의 입력칸이 모두 검증에 통과했는지 여부를 검사
  const isValid = () => {
    for (const key in correct) {
      if (correct[key] !== 2) {
        setCorrect({ ...correct, [key]: 1 });
        document.getElementById(key).focus();
        return false;
      }
    }
    return true;
  };

  //회원가입 버튼 클릭시 이벤트
  const joinHandler = (e) => {
    e.preventDefault();
    if (!idCheck) {
      alert("아이디 중복 체크를 진행해주세요.");
      return;
    }
    if (isValid()) {
      fetchJoin();
    } else {
      alert("입력란을 다시 확인해 주세요");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  // 눈 클릭 시 비밀번호 보여주는/숨기는 메서드
  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };


  // 영화 장르 선택
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const top100Films = [
    { title: '액션' },
    { title: '공포' },
    { title: '로맨스' },
    { title: '코미디' },
    { title: '뮤지컬' },
    { title: "판타지" },
    { title: '모험' },
    { title: 'SF' },
    { title: '애니메이션' },
  ];

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AssignmentIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={joinHandler}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="id"
                  label="아이디"
                  name="id"
                  required
                  error={correct.id === 1 ? true : false}
                  helperText={correct.id === 2 ? null : message.id}
                  onChange={idHandler}
                />
                <Button
                  type="button"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={fetchIdCheck}
                  className="check-btn"
                  disabled={idCheck}
                >
                  중복체크
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="nick"
                  label="닉네임"
                  name="nick"
                  required
                  error={correct.nick === 1 ? true : false}
                  helperText={correct.nick === 2 ? null : message.nick}
                  onChange={nameHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="이메일"
                  name="email"
                  error={correct.email === 1 ? true : false}
                  helperText={correct.email === 2 ? null : message.email}
                  onChange={emailHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  id="pw"
                  label="비밀번호"
                  name="pw"
                  required
                  onChange={passwordHandler}
                  error={correct.pw === 1 ? true : false}
                  helperText={correct.pw === 1 ? message.pw : null}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={showPasswordHandler}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  options={top100Films}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.title}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.title}
                    </li>
                  )}
                  style={{ width: 516, height: 65.85 }}
                  renderInput={(params) => (
                    <><TextField {...params} label="선호하는 영화 장르" />
                      <div className="buttons">
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          가입하기
                        </Button>
                        <Link href="/login" variant="body2">
                          이미 계정이 있으신가요? 로그인하기
                        </Link>
                      </div>
                    </>
                  )}
                />

              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container >
    </>
  );
};

export default Join;
