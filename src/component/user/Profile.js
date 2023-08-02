import React, { useContext, useEffect, useRef, useState } from "react";
import "../../design/profile.scss";
import {
  Grid,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Container } from "reactstrap";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { API_BASE_URL, USER } from "../../util/host-utils";
import Header from "../layout/Header";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import { getLoginUserInfo } from "../../util/login-utils";
import AuthContext from "../../util/AuthContext";

const Profile = () => {

  const redirection = useNavigate();

  // 일반 로그인 유저가 아니라면 모두 튕겨내기
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') != 1) {
      alert('일반 로그인 사용자만이 이용할 수 있는 페이지입니다.');
      redirection('/');
    }
  });

  const $fileTag = useRef();

  const REQUEST_URL = API_BASE_URL + USER;

  const { nick, id, setNick, isLoggedIn } = useContext(AuthContext);

  const handleNickChange = (newNick) => {
    // 새로운 닉네임을 설정하고 상태를 업데이트합니다.
    setNick(newNick);
  };


  // console.log(id);

  // 상태변수로 회원가입 입력값 관리
  const [userValue, setUserValue] = useState({
    id: localStorage.getItem("LOGIN_USER_ID"),
    nick: localStorage.getItem("LOGIN_USER_NICK"),
    email: "",
  });

  // 검증 메세지에 대한 상태변수 관리
  const [message, setMessage] = useState({
    nick: "",
    email: "",
  });

  //검증 완료 체크에 대한 상태변수 관리
  const [correct, setCorrect] = useState({
    nick: 2,
    email: 0,
  });

  //검증 데이터를 상태변수에 저장하는 함수
  const saveInputState = ({ key, inputVal, verification, msg }) => {
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

  // 패스워드 입력창 체인지 이벤트 핸들러
  const passwordHandler = (e) => {
    const inputVal = e.target.value;

    const pwRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

    let msg;
    let verification = 0;
    if (!inputVal) {
      //비밀번호 안적음
      msg = "비밀번호는 필수입니다.";
      verification = 1;
    } else if (!pwRegex.test(inputVal)) {
      msg = "8~20글자 영문, 숫자, 특수문자를 포함해 주세요.";
      verification = 1;
    } else {
      verification = 2;
      setCorrect({ ...correct, pw: verification });
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
    const nameRegex = /^[가-힣a-z0-9]{2,10}$/;

    let msg;
    let verification = 0;
    if (!inputVal) {
      msg = "닉네임은 필수입니다.";
      verification = 1;
    } else if (!nameRegex.test(inputVal)) {
      msg = "2~10자 이내로 작성해주세요.";
      verification = 1;
    } else {
      verification = 2;
      setCorrect({ ...correct, nick: verification });
    }

    saveInputState({
      key: "nick",
      inputVal,
      msg,
      verification,
    });
  };

  // 이메일 입력창 체인지 이벤트 핸들러
  const emailHandler = (e) => {
    const inputVal = e.target.value;
    const emailRegex = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;

    let msg;
    let verification = 0;
    if (!inputVal) {
      msg = "이메일은 필수값입니다.";
      verification = 1;
    } else if (!emailRegex.test(inputVal)) {
      msg = "이메일 형식이 아닙니다.";
      verification = 1;
    } else {
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

  const [showPassword, setShowPassword] = useState(false);

  // 눈 클릭 시 비밀번호 보여주는/숨기는 메서드
  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  // 새로운 이미지 파일과 그 썸네일을 다루기 위한 상태를 추가합니다.
  const [imgFile, setImgFile] = useState();

  // 이미지를 가져오는 작업.
  const imgHandler = () => {
    if (imgFile) return imgFile;
    else if (isLoggedIn === 1) {
      // 일반 로그인 유저
      return require("../../img/profileImage.png");
    } else {
      // 카카오 로그인 유저
      return localStorage.getItem("LOGIN_USER_PFP");
    }
  };

  // 이미지 선택 및 썸네일 표시를 다루는 함수를 수정합니다.
  const showThumbnailHandler = (e) => {
    const file = $fileTag.current.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImgFile(reader.result);
    };

    console.log(file);
  };

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

  const fetchSignUpPost = () => {
    const userJsonBlob = new Blob([JSON.stringify(userValue)], {
      type: "application/json",
    });

    const userFormData = new FormData();
    userFormData.append("user", userJsonBlob);
    userFormData.append("profileImage", $fileTag.current.files[0]);
    console.log(userFormData);
    console.log(userValue);

    fetch(REQUEST_URL, {
      method: "PUT",
      body: userFormData,
    }).then((res) => {
      if (res.status === 200) {
        alert("수정이 완료되었습니다");
        localStorage.setItem("LOGIN_USER_NICK", userValue.nick);
        redirection("/myPage");
      } else {
        alert("서버와의 통신이 원활하지 않습니다.");
      }
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (localStorage.getItem('isLoggedIn') == 1) {
      // 닉네임 업데이트
      setNick(userValue.nick);

      // password, nickN, email 값 가져오기
      const passwordValue = document.getElementById('pw').value;
      const nickNValue = document.getElementById('nick').value;
      const emailValue = document.getElementById('email').value;

      // 가져온 값 사용 또는 처리
      console.log('Password:', passwordValue);
      console.log('NickName:', nickNValue);
      console.log('Email:', emailValue);

      if (isValid()) {
        fetchSignUpPost();
      } else {
        alert("입력란을 다시 확인해 주세요!");
      }

    }

  };

  return (
    <>
      <Header />
      <Container>
        <form onSubmit={handleFormSubmit}>
          <h1>프로필 수정</h1>
          <div className="prof-main">
            <div className="image">
              <div className="frame" onClick={() => $fileTag.current.click()}>
                <img id="pfp" src={imgFile ? imgFile : imgHandler()} alt="" />
              </div>
              <Fab color="secondary">
                <label htmlFor="fileInput-hidden">
                  <EditIcon />
                  <input
                    id="fileInput-hidden"
                    type="file"
                    className="file-input"
                    accept="image/*"
                    ref={$fileTag}
                    onChange={showThumbnailHandler}
                  />
                </label>
              </Fab>
              <span className="recommendation">
                ※ 1:1 비율의 사진 사용을 권장합니다.
              </span>
            </div>
            <div className="profile">
              <div className="right">
                    <Grid item xs={8}>
                      <TextField
                        type="text"
                        fullWidth
                        id="id"
                        label="아이디"
                        name="id"
                        value={id}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <div class="pwInput">
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
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                    </Grid>
                <Grid item xs={8}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="nick"
                    label="닉네임"
                    name="nick"
                    required
                    error={correct.nick === 1 ? true : false}
                    helperText={correct.nick === 1 ? message.nick : null}
                    defaultValue={localStorage.getItem("LOGIN_USER_NICK")}
                    onChange={nameHandler}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="이메일"
                    name="email"
                    autoComplete="email"
                    required
                    error={correct.email === 1 ? true : false}
                    helperText={correct.email === 1 ? message.email : null}
                    defaultValue={localStorage.getItem("LOGIN_USER_EMAIL")}
                    onChange={emailHandler}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleFormSubmit}
                  >
                    수정하기
                  </Button>
                </Grid>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </>
  );
};

export default Profile;
