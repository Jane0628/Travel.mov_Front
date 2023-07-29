import React, { useEffect, useState } from "react";

import { API_BASE_URL } from "../../util/host-utils";
import { getLoginUserInfo } from "../../util/login-utils";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Title } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const ReservationCheck = () => {
  // 로그인 인증 토큰 얻어오기
  const token = getLoginUserInfo().token;

  const [hotelList, setHotelList] = useState([]);

  const redirection = useNavigate();

  const requestHeader = {
    "content-type": "application/json",
    Authorization: "Bearer " + token,
  };

  useEffect(() => {
    getHotelList();
  }, []);

  const getHotelList = async () => {
    const res = await fetch(`${API_BASE_URL}/hotels`, {
      method: "GET",
      headers: requestHeader,
    });

    if (res.status === 200) {
      const json = await res.json();
      if (json) setHotelList(json);
    } else {
      if (res.status === 403) {
        alert("로그인이 필요한 서비스 입니다.");
        redirection("/login");
        return;
      } else {
        alert("관리자에게 문의하세요!");
      }
    }
  };

  function preventDefault(event) {
    event.preventDefault();
  }
  const deleteHandler = async (id) => {
    const res = await fetch(`${API_BASE_URL}/hotels/${id}`, {
      method: "DELETE",
      headers: requestHeader,
    });
    
    if (res.status === 200) {
      alert("삭제가 완료되었습니다.");
      const json = await res.json();
      if (json) setHotelList(json);
    } else {
      if (res.status === 403) {
        alert("로그인이 필요한 서비스 입니다.");
        redirection("/login");
        return;
      } else {
        alert("관리자에게 문의하세요!");
      }
    }
    
    
    // .then((res) => {
    //   if (res.status === 200) {
    //     alert("삭제가 완료되었습니다.");
    //     console.log(res.json);
    //     setHotelList(res.json)
    //     return;
    //   } else if (res.status === 403) {
    //     alert("로그인이 필요한 서비스 입니다.");
    //     redirection("/login");
    //     return;
    //   } else {
    //     // alert("오류발생");
    //   }
  };
  
  return (
    <React.Fragment>
      <Title>예약 내역</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>아이디</TableCell>
            <TableCell>호텔이름</TableCell>
            <TableCell>가격</TableCell>
            <TableCell>이미지URL</TableCell>
            <TableCell>예약상태</TableCell>
            <TableCell align="right">삭제</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hotelList.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{`${row.price}원`}</TableCell>
              <TableCell>{row.img}</TableCell>
              <TableCell>{row.price ?  "예약가능" : "예약중"}</TableCell>
              <TableCell align="right">
                <Button
                  style={{ color: "#b1bff9" }}
                  onClick={()=>deleteHandler(row.id)}
                >
                  삭제하기
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
};

export default ReservationCheck;