import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../util/host-utils";
import { getLoginUserInfo } from "../../util/login-utils";
import { useNavigate, useParams } from "react-router-dom";
import { Title } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";

const FreeBoardDetail = () => {
  //url에서 게시글 번호 얻어오기
  const board = useParams();
  const id = board.id;
  console.log(board.id);
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
    //페이지가 렌더링 되면 후기디테일 보여주기
    fetch(`${API_BASE_URL}/freeBoard/detail/${id}`, {
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

        //fetch를 통해 받아온 데이터를 상태 변수에 할당.
        if (json) setFreeBoard(json);
      });
  }, []);
  const deleteHandler = () => {
    fetch(`${API_BASE_URL}/freeBoard/${id}`, {
      method: "DELETE",
      headers: requestHeader,
    })
      .then((res) => {
        if (res.status === 200) return res.text();
        else if (res.status === 403) {
          alert("로그인이 필요한 서비스 입니다.");
          redirection("/login");
          return;
        } else {
          alert("관리자에게 문의하세요!");
        }
        return;
      })
      .then((text) => {
        alert(text);
        listHandler();
      });
  };
  const listHandler = () => {
    redirection(`/freeBoardList/${freeBoard.movie}`);
  };
  return (
    <>
      <Title>{freeBoard.title}</Title>
      <Grid>
        <h2>작성자</h2>
        <p>{freeBoard.userNick}</p>
      </Grid>
      <Grid>
        <h2>작성일자</h2>
        <p>{freeBoard.uploadDate}</p>
      </Grid>
      <div dangerouslySetInnerHTML={{ __html: freeBoard.content }}></div>
      <Grid>
        <Button type="button" color="primary" onClick={listHandler}>
          {" "}
          촬영지 여행 후기목록으로
        </Button>
        {nick === freeBoard.userNick ? (
          <Button type="button" color="primary" onClick={deleteHandler}>
            {" "}
            삭제하기
          </Button>
        ) : (
          <></>
        )}
      </Grid>
    </>
  );
};

export default FreeBoardDetail;
