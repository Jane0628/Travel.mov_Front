import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../util/host-utils";
import { getLoginUserInfo } from "../../util/login-utils";
import { useNavigate, useParams } from "react-router-dom";
import { Title } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

const FreeBoardDetail = ({ freeBoard }) => {
  //sns형식 날짜 바꾸는 함수
  function formatDateToSNS(dateString) {
    const inputDate = new Date(dateString);
    const now = new Date();

    const diffInMilliseconds = now - inputDate;
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays} 일 전`;
    } else if (diffInHours > 0) {
      return `${diffInHours} 시간 전`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} 분 전`;
    } else {
      return "방금 전";
    }
  }

  //url에서 게시글 번호 얻어오기
  const id = freeBoard.id;
  console.log(freeBoard.id);
  // 로그인 인증 토큰 얻어오기
  const token = getLoginUserInfo().token;
  const nick = getLoginUserInfo().username;

  const [img, setImg] = useState();

  const redirection = useNavigate();

  const requestHeader = {
    "content-type": "application/json",
    Authorization: "Bearer " + token,
  };

  // useEffect(() => {
  //   //페이지가 렌더링 되면 후기디테일 보여주기
  //   fetch(`${API_BASE_URL}/freeBoard/detail/${id}`, {
  //     method: "GET",
  //     headers: requestHeader,
  //   })
  //     .then((res) => {
  //       if (res.status === 200) return res.json();
  //       else if (res.status === 403) {
  //         alert("로그인이 필요한 서비스 입니다.");
  //         redirection("/login");
  //         return;
  //       } else {
  //         alert("관리자에게 문의하세요!");
  //       }
  //       return;
  //     })
  //     .then((json) => {
  //       console.log(json);

  //       //fetch를 통해 받아온 데이터를 상태 변수에 할당.
  //       if (json) {
  //         setFreeBoard(json);
  //         setImg(json.hotel.img);
  //       }
  //     });
  // }, []);
  const deleteHandler = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
    } else return;

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
        window.location.reload();
      });
  };

  const imgHandler = (imgFile) => {
    if (imgFile) return imgFile;
    else {
      // 일반 로그인 유저
      return require("../../img/profileImage.png");
    }
  };

  return (
    <>
      {/* <Title>{freeBoard.title}</Title>
      <Grid>
        <h2>작성자</h2>
        <p>{freeBoard.userNick}</p>
      </Grid>
      <Grid>
        <h2>작성일자</h2>
        <p>{formatDateToSNS(freeBoard.uploadDate)}</p>
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
      </Grid> */}
      <Grid item xs={12} md={6}>
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {freeBoard.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              <img
                style={{ width: 40, height: 40 }}
                id="pfp"
                src={
                  freeBoard.user.profileImg
                    ? freeBoard.user.profileImg
                    : imgHandler(freeBoard.user.profileImg)
                }
                alt=""
              />
              {freeBoard.user.nick}
              <span
                style={{
                  color: "lightgray",
                  fontSize: "16px",
                  marginLeft: "10px",
                }}
              >
                {formatDateToSNS(freeBoard.uploadDate)}
              </span>
            </Typography>
            <Typography variant="subtitle1" paragraph>
              <div
                dangerouslySetInnerHTML={{ __html: freeBoard.content }}
              ></div>
            </Typography>
            <Grid>
              {nick === freeBoard.user.nick ? (
                <Button type="button" color="primary" onClick={deleteHandler}>
                  {" "}
                  삭제하기
                </Button>
              ) : (
                <></>
              )}
            </Grid>
          </CardContent>
          <img
            src={freeBoard.hotel.img}
            alt={freeBoard.hotel.name}
            style={{ width: "300px", height: "225px", objectFit: "cover" }}
          />
        </Card>
      </Grid>
    </>
  );
};

export default FreeBoardDetail;
