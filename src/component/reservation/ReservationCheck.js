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
import Header from "../layout/Header";

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
      <Header />
      <div style={{ margin: 20, marginTop: 100 }}></div>
      <Title>예약 내역</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>체크인</TableCell>
            <TableCell>체크아웃</TableCell>
            <TableCell>예약자 이름</TableCell>
            <TableCell>숙소 이름</TableCell>
            <TableCell>결제 방식</TableCell>
            <TableCell>가격</TableCell>
            <TableCell align="right">후기</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reserveList.map((row) => (
            <TableRow key={row.aid}>
              <TableCell>{row.startDate.split("T")[0]}</TableCell>
              <TableCell>{row.endDate.split("T")[0]}</TableCell>
              <TableCell>{row.partnerOrderId}</TableCell>
              <TableCell>{row.itemName}</TableCell>
              <TableCell>카카오페이</TableCell>
              <TableCell>{`${row.totalAmount}원`}</TableCell>
              <TableCell align="right">
                <Link
                  style={{ color: "#b1bff9" }}
                  to={`/freeBoard/${row.itemCode}`}
                >
                  후기쓰기
                </Link>
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
