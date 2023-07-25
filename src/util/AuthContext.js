import React, { createContext, useEffect, useState } from "react";
import { API_BASE_URL, USER } from "./host-utils";

//새로운 전역 Context를 생성
const AuthContext = React.createContext({
  // 로그인 여부
  // 0 : 로그인 안함
  // 1 : 사이트 로그인
  // 2 : 카카오 로그인
  isLoggedIn: 0,
  nick: "",
  id: "",
  onLogout: () => { },
  onLogin: (token, nick, id) => { },
  setUserInfo: () => { },
});

// 위에서 생성한 Context를 제공할 수 있는 provider
// 이 컴포넌트를 통해 자식 컴포넌트들에게 인증 상태와 관련된 함수들을 전달할 수 있음.
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(0);
  const [id, setId] = useState("");
  const [nick, setNick] = useState("");
  const [email, setEmail] = useState("");
  const [pfp, setPfp] = useState("");

  //컴포넌트가 렌더링 될 때 localStorage에서 로그인 정보를 가지고 와서 상태를 설정.
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === 1) {
      console.log("일반 로그인했당!");
      setIsLoggedIn(1);
      setId(localStorage.getItem("LOGIN_USER_ID"));
      setNick(localStorage.getItem("LOGIN_USER_NICK"));
    } else if (localStorage.getItem("isLoggedIn") === 2) {
      console.log("카카오 로그인했당!");
      setIsLoggedIn(2);
      setNick(localStorage.getItem("LOGIN_USER_NICK"));
      setEmail(localStorage.getItem("LOGIN_USER_EMAIL"));
      setPfp(localStorage.getItem("LOGIN_USER_PFP"));
    }
  }, [isLoggedIn]);

  //로그아웃 핸들러
  const logoutHandler = () => {
    localStorage.clear();
    setIsLoggedIn(0);
  };

  //로그인 핸들러
  const loginHandler = (token, nick, id) => {
    localStorage.setItem("isLoggedIn", "1");
    //json에 담긴 인증정보를 클라이언트에 보관
    // 1. 로컬 스토리지 - 브라우저가 종료되어도 보관됨.
    // 2. 세션 스토리지 - 브라우저가 종료되면 사라짐.
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("LOGIN_USER_NICK", nick);
    localStorage.setItem("LOGIN_USER_ID", id);

    // 로그인할 때 db에서 이메일 정보 가져와서 로컬 스토리지에 담기
    fetch(`${API_BASE_URL}${USER}/getEmail`)

    setIsLoggedIn(1);
    setNick(nick);
    setId(id);
  };

  //토큰 및 로그인 유저 데이터를 브라우저에 저장하는 함수
  const setLoginUserInfo = ({ token, nick, id }) => {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("LOGIN_USER_NICK", nick);
    localStorage.setItem("LOGIN_USER_ID", id);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        nick,
        id,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        setUserInfo: setLoginUserInfo,
        setNick,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
