import { Link } from "@mui/material";
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

const ReservationCheck = () => {
  // 로그인 인증 토큰 얻어오기
  const token = getLoginUserInfo().token;

  const [reserveList, setReserveList] = useState([]);

  const redirection = useNavigate();

  const requestHeader = {
    "content-type": "application/json",
    Authorization: "Bearer " + token,
  };

  useEffect(() => {
    //페이지가 렌더링 되면 예약목록 보여주기.
    fetch(`${API_BASE_URL}/reservation`, {
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
        console.log(json.reservationDTOS);

        //fetch를 통해 받아온 데이터를 상태 변수에 할당.
        if (json) setReserveList(json.reservationDTOS);
      });
  }, []);

  function preventDefault(event) {
    event.preventDefault();
  }
  return (
    <React.Fragment>
      <Title>예약 내역</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>예약날짜</TableCell>
            <TableCell>체크인</TableCell>
            <TableCell>체크아웃</TableCell>
            <TableCell>예약자 이름</TableCell>
            <TableCell>숙소 이름</TableCell>
            <TableCell>결재 방식</TableCell>
            <TableCell align="right">가격</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reserveList.map((row) => (
            <TableRow key={row.aid}>
              <TableCell>{row.resDate.split("T")[0]}</TableCell>
              <TableCell>{row.startDate}</TableCell>
              <TableCell>{row.endDate}</TableCell>
              <TableCell>{row.partnerOrderId}</TableCell>
              <TableCell>{row.itemName}</TableCell>
              <TableCell>카카오페이</TableCell>
              <TableCell align="right">{`${row.totalAmount}원`}</TableCell>
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
