import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../util/host-utils";
import { getLoginUserInfo } from "../../util/login-utils";
import { useNavigate } from "react-router-dom";

const FreeBoardDetail = ({ id }) => {
  // 로그인 인증 토큰 얻어오기
  const token = getLoginUserInfo().token;
  const nick = getLoginUserInfo().username;

  const [freeBoard, setFreeBoard] = useState([]);

  const redirection = useNavigate();

  const requestHeader = {
    "content-type": "application/json",
    Authorization: "Bearer " + token,
  };

  useEffect(() => {
    //페이지가 렌더링 되면 후기목록 보여주기.
    fetch(`${API_BASE_URL}/freeBoard/${id}`, {
      //movie로 고칠 예정
      method: "GET",
      headers: requestHeader,
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else if (res.status === 403) {
          alert("로그인이 필요한 서비스 입니다.");
          redirection("/login");
          return;
        } else {
          alert("관리자에게 문의하세요!");
        }
        return;
      })
      .then((json) => {
        console.log(json);
        console.log(json.freeBoard);

        //fetch를 통해 받아온 데이터를 상태 변수에 할당.
        if (json) setFreeBoard(json.freeBoard);
      });
  }, []);
  return <div>FreeBoardDetail</div>;
};

export default FreeBoardDetail;
