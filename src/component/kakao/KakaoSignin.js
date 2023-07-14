import { ThemeProvider } from "@mui/private-theming";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';


const KakaoSignin = () => {
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
    <>
      {user ? (
        <div>
          <button onClick={kakaoLogout}>로그아웃</button>
          {/* <h2>카카오 로그인 성공!</h2>
          <h3>카카오 프로필 사진</h3>
          <img src={user.profileImg} alt="" />
          <h3>카카오 닉네임</h3>
          <h4>{user.nickname}</h4>
          <h3>카카오 이메일</h3>
          <h4>{user.email}</h4> */}
        </div>
      ) : (
        <Button
          type="button"
          id="kakaoLogin"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}>
          <img src={require("../../img/kakao_symbol.png")} alt="카카오 심볼" />
          <span>카카오 로그인</span>
        </Button>
      )
      }
    </>
  );
}

export default KakaoSignin;
