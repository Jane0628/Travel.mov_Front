import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import "../../design/join.scss";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../../util/AuthContext";
import { API_BASE_URL, USER } from "../../util/host-utils";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Header from "../layout/Header";
import { getLoginUserInfo } from "../../util/login-utils";

const HotelJoin = () => {
  const redirection = useNavigate();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [price, setPrice] = useState();
  const [img, setImg] = useState();

  const { onLogin, isLoggedIn } = useContext(AuthContext);
  const token = getLoginUserInfo().token;

  const role = localStorage.getItem("ROLE");
  console.log(role);

  if (role !== "관리자") {
    alert("관리자만 접근할 수 있습니다.");
    redirection("/");
  }

  //회원가입 요청 함수
  const fetchJoin = async () => {
    if (!name) {
      alert("이름을 입력해주세요");
      return;
    }
    if (!address) {
      alert("주소를 입력해주세요");
      return;
    }
    if (!price) {
      alert("가격을 입력해주세요");
      return;
    }
    if (!img) {
      alert("이미지URL을 입력해주세요");
      return;
    }

    const res = await fetch(`${API_BASE_URL}/hotels`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: name,
        address: address,
        price: price,
        img: img,
      }),
    });

    //잘못된 요청시 경고창 띄움
    if (res.status !== 200) {
      const text = await res.text();
      alert(text);
      return;
    }
    if (res.status === 200) {
      alert("호텔 등록에 성공했습니다.");
      redirection("/hotelCheck");
    }
  };

  //호텔등록 버튼 클릭시 이벤트
  const joinHandler = (e) => {
    e.preventDefault();
    fetchJoin();
  };

  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const addressHandler = (e) => {
    setAddress(e.target.value);
  };
  const imgHandler = (e) => {
    setImg(e.target.value);
  };
  const priceHandler = (e) => {
    setPrice(e.target.value);
  };

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
            호텔등록
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
                  id="name"
                  label="호텔이름"
                  name="name"
                  onChange={nameHandler}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="address"
                  label="호텔주소"
                  name="address"
                  onChange={addressHandler}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="img"
                  label="이미지URL"
                  name="img"
                  onChange={imgHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="price"
                  label="가격"
                  name="price"
                  required
                  onChange={priceHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <div className="buttons">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    등록하기
                  </Button>
                  <Link href="/hotelCheck" variant="body2">
                    취소
                  </Link>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default HotelJoin;
