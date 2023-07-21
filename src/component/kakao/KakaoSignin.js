import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";


const KakaoSignin = () => {
  const redirection = useNavigate();

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
        Kakao.Auth.setAccessToken(res.access_token);
        console.log("카카오 로그인 성공");

        Kakao.API.request({
          url: "/v2/user/me",
          success(res) {
            console.log("카카오 인가 요청 성공");
            setLoggedIn(true);
            const kakaoAccount = res.kakao_account;
            localStorage.setItem("LOGIN_USER_EMAIL", kakaoAccount.email);
            localStorage.setItem("LOGIN_USER_PFP", kakaoAccount.profile.profile_image_url);
            localStorage.setItem("LOGIN_USER_NICK", kakaoAccount.profile.nickname);
            localStorage.setItem("isLoggedIn", 2);
            alert(`환영합니다, ${kakaoAccount.profile.nickname}님!`);
            redirection("/");
          },
          fail(error) {
            console.log("카카오 로그인 실패함...ㅠㅠ");
          },
        });
      },
      fail(error) {
        console.log("카카오 로그인 실패");
      }
    });
  }

  const kakaoLogout = () => {
    Kakao.Auth.logout((res) => {
      console.log(Kakao.Auth.getAccessToken());
      console.log(res);
      localStorage.clear();
      setUser(null);
    });
  };

  useEffect(() => {
    initKakao();
    Kakao.Auth.getAccessToken() ? setLoggedIn(true) : setLoggedIn(false);
  }, []);

  useEffect(() => {
    // console.log(loggedin);
    if (loggedin) {
      setUser({
        email: localStorage.getItem("email"),
        profileImg: localStorage.getItem("profileImg"),
        nickname: localStorage.getItem("nickname"),
      });
    }
  }, [loggedin]);

  // 버튼 디자인
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#FEE500',
        contrastText: '#000000',
      },
    },
    shape: {
      borderRadius: 5,
    },
    typography: {
      fontFamily: 'S-CoreDream',
      fontSize: 20
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
        @font-face {
					font-family: 'S-CoreDream';
					src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-6Bold.woff') format('woff');
					font-weight: 600;
					font-style: normal;
				}
        `
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        {user ? (
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={kakaoLogout}>
            <img id="kakaoSymbol" src={require("../../img/kakao_symbol.png")} alt="카카오 심볼" />
            로그아웃
          </Button>
        ) : (
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={kakaoLogin}>
            <img id="kakaoSymbol" src={require("../../img/kakao_symbol.png")} alt="카카오 심볼" />
            카카오 로그인
          </Button>
        )}
      </ThemeProvider>
    </>
  );
}

export default KakaoSignin;
