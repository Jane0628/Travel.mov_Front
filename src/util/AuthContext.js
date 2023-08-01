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
  onLogin: ({ token, nick, id, role }) => { },
  setUserInfo: () => { },
});

// 위에서 생성한 Context를 제공할 수 있는 provider
// 이 컴포넌트를 통해 자식 컴포넌트들에게 인증 상태와 관련된 함수들을 전달할 수 있음.
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(0);
  const [id, setId] = useState("");
  const [nick, setNick] = useState("");
  const [role, setRole] = useState("일반회원");

  // 컴포넌트가 렌더링될 때 localStorage에서 로그인 정보를 가지고 와서 상태를 설정.
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === 1) {
      console.log("일반 로그인했당!");
      setIsLoggedIn(1);
      setId(localStorage.getItem("LOGIN_USER_ID"));
      setNick(localStorage.getItem("LOGIN_USER_NICK"));
      setRole(localStorage.getItem("ROLE"));
    } else if (localStorage.getItem("isLoggedIn") === 2) {
      console.log("카카오 로그인했당!");
      setIsLoggedIn(2);
      setNick(localStorage.getItem("LOGIN_USER_NICK"));
      setEmail(localStorage.getItem("LOGIN_USER_EMAIL"));
      setPfp(localStorage.getItem("LOGIN_USER_PFP"));
      setRole(localStorage.getItem("ROLE"));
    }
  }, [isLoggedIn]);

  //로그아웃 핸들러
  const logoutHandler = () => {
    localStorage.clear();
    setIsLoggedIn(0);
  };

  //로그인 핸들러
  const loginHandler = (token, nick, id, role) => {
    localStorage.setItem("isLoggedIn", 1);
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("LOGIN_USER_NICK", nick);
    localStorage.setItem("LOGIN_USER_ID", id);
    localStorage.setItem("ROLE", role);
    // 로그인할 때 db에서 이메일 정보 가져와서 로컬 스토리지에 담기
    fetch(`${API_BASE_URL}${USER}/getEmail`)

    setIsLoggedIn(1);
    setNick(nick);
    setId(id);
    setRole(role);
  };

  // 토큰 및 로그인 유저 데이터를 브라우저에 저장하는 함수
  const setLoginUserInfo = ({ token, nick, id, role }) => {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("LOGIN_USER_NICK", nick);
    localStorage.setItem("LOGIN_USER_ID", id);
    localStorage.setItem("ROLE", role);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        nick,
        id,
        role,
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
