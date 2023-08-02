import React, { useContext, useEffect, useState } from "react";
import "../../design/mypage.scss";
import { Button, Grid, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import AuthContext from "../../util/AuthContext";
import { API_BASE_URL, USER } from "../../util/host-utils";
import Header from "../layout/Header";

const MyPage = () => {
  const { onLogout, nick, id, isLoggedIn } = useContext(AuthContext);

  const REQUEST_URL = API_BASE_URL + USER;

  const profileRequestURL = `${API_BASE_URL}${USER}/load-s3`;

  //프로필 이미지 url 상태 변수
  const [profileUrl, setProfileUrl] = useState(null);

  // 이미지를 가져오는 작업.
  const imgHandler = () => {
    if (profileUrl) return profileUrl;
    if (isLoggedIn === 1) {
      // 일반 로그인 유저
      return require("../../img/profileImage.png");
    } else if (isLoggedIn === 2) {
      // 카카오 로그인 유저
      return localStorage.getItem("LOGIN_USER_PFP");
    }
    return require("../../img/profileImage.png");
  };

  // console.log("API_BASE_URL:", API_BASE_URL);
  // console.log("USER:", USER);
  // console.log("profileRequestURL:", profileRequestURL);

  console.log("REQUEST_URL:", REQUEST_URL);
  // 닉네임이 수정될 때마다 MyPage 컴포넌트를 리렌더링
  useEffect(() => {
    console.log("닉네임이 변경되었습니다:", nick);
    fetchProfileImage();
  }, [nick]);

  const fetchProfileImage = async () => {
    const res = await fetch(profileRequestURL, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
      },
    });

    if (res.status === 200) {
      // //서버에서는 직렬화된 이미지가 응답된다.
      // const profileBlob = await res.blob();
      // //해당 이미지를 imgUrl로 변경
      // const imgUrl = window.URL.createObjectURL(profileBlob);
      const imgUrl = await res.text();
      setProfileUrl(imgUrl);
    } else {
      const err = await res.text();
      setProfileUrl(null);
    }
  };

  useEffect(() => {
    fetchProfileImage();
  }, [isLoggedIn]);

  console.log(id);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#7b8ce0",
      },
    },
  });

  const handleWithdrawal = () => {
    if (window.confirm("정말로 회원 탈퇴하시겠습니까?")) {
      // 서버에 회원 탈퇴 요청을 보내는 코드
      fetch(REQUEST_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // 사용자 닉네임을 서버로 전송
      })
        .then((response) => {
          if (response.ok) {
            console.log("회원 탈퇴 성공");
            onLogout(); // 로그아웃 처리
            window.location.href = "/";
          } else {
            console.error("회원 탈퇴 실패");
            // 실패에 대한 처리를 진행
          }
        })
        .catch((error) => {
          console.error("회원 탈퇴 실패", error);
          // 실패에 대한 처리를 진행
        });
    }
  };

  return (
    <>
      <Header />
      <div style={{ margin: 20, marginTop: 100 }}></div>
      <Container>
        <h1>My Page</h1>
        <div className="my-page">
          <div className="welcome">
            <Grid item xs={8} /*</div>style={{ backgroundColor: 'blue' }}*/>
              <img src={imgHandler()} alt="프사프사" />
            </Grid>
            <div className="nick">
              <span>{localStorage.getItem("LOGIN_USER_NICK")}</span>님
              환영합니다!
            </div>
          </div>
          <div className="page-menu">
            {isLoggedIn === 2 ? null : (
              <Link to="/profile" className="link">
                프로필 수정
              </Link>
            )}
            <Link to="/myfreeBoardList" className="link">
              나의 여행 후기
            </Link>
            {/* <Link to="/hotels" className='link'>호텔 예약 하기</Link> */}
            <Link to="/reservationCheck" className="link">
              예약 정보 확인
            </Link>

            <div className="delete">
              <ThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  color="primary"
                  className={`custom-button small`}
                  onClick={handleWithdrawal}
                >
                  회원 탈퇴
                </Button>
              </ThemeProvider>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default MyPage;
