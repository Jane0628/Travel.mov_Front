import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { getLoginUserInfo } from "../../util/login-utils";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { API_BASE_URL } from "../../util/host-utils";
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://tramovel.com/">
        Tramovle.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["예약자 정보", "결제 정보", "예약 확인"];

export default function Checkout() {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [days, setDays] = React.useState(1);
  const [name, setName] = React.useState();
  const [discount, setDiscount] = React.useState(0);
  const redirection = useNavigate();
  const [product, setProduct] = React.useState();
  const [total, setTotal] = React.useState(22000);
  const [couponId, setCouponId] = React.useState();
  const [hotel, setHotel] = React.useState();

  //url에서 호텔id 얻어오기
  const hotelId = useParams();
  const id = hotelId.id;
  //패치로 호텔정보 얻어오기
  React.useEffect(() => {
    fetch(`${API_BASE_URL}/hotels/id/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setHotel(json);
        setTotal(json.price);
      });
  }, []);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            start={startHandler}
            end={endHandler}
            days={daysHandler}
            name={nameHandler}
          />
        );
      case 1:
        return (
          <PaymentForm
            value={{
              hotel,
              days,
              point: discountHandler,
              coupon: counponHandler,
              pay: totalHandler,
            }}
          />
        );
      case 2:
        return (
          <Review
            name={name}
            date={{ startDate, endDate, days }}
            payment={hotel.price}
            discount={discount}
            total={total}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }
  //체크인 날짜
  const startHandler = (date) => {
    // console.log(date);
    setStartDate(
      date.toLocaleString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  };
  //체크아웃 날짜
  const endHandler = (date) => {
    setEndDate(
      date.toLocaleString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    console.log(date);
  };
  //몇박
  const daysHandler = (date) => {
    setDays(date);
    console.log("몇박?" + date);
  };
  //예약자 이름
  const nameHandler = (inputName) => {
    console.log(inputName);
    setName(inputName);
  };
  //할인 금액
  const discountHandler = (point) => {
    console.log(point);
    setDiscount(point);
  };
  //쿠폰 아이디 받기
  const counponHandler = (id) => {
    console.log(id);
    setCouponId(id);
  };
  //총 금액
  const totalHandler = (pay) => {
    console.log(pay);
    setTotal(pay);
  };

  // 로그인 인증 토큰 얻어오기
  const token = getLoginUserInfo().token;
  const userNick = getLoginUserInfo().username;

  const preparePayment = async () => {
    console.log(userNick);
    const res = await fetch(`${API_BASE_URL}/pay/ready`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        partner_order_id: name, // 예약자이름
        partner_user_id: userNick, // 닉네임
        item_name: hotel.name,
        item_code: hotel.id,
        quantity: 1,
        // total_amount: 22000 - discount, // 결제 금액
        // vat_amount: 200,
        total_amount: total - discount, // 결제 금액
        vat_amount: (total - discount) * 0.1,
        tax_free_amount: 0,
        start_date: startDate,
        end_date: endDate,
        coupon: couponId,
      }),
    });
    console.log(res);

    const { next_redirect_pc_url, tid } = await res.json();
    console.log(tid);
    console.log(next_redirect_pc_url);
    window.location.href = next_redirect_pc_url;
  };
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (!name) {
      alert("예약자 이름을 입력하세요");
      return;
    }
    if (days < 1) {
      alert("1박 이상 날짜를 선택하세요");
      return;
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          예약하기
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography variant="h5" gutterBottom>
              예약해주셔서 감사합니다.
            </Typography>
            <Typography variant="subtitle1">
              잠시 후 카카오 결제 페이지로 이동합니다.
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  뒤로가기
                </Button>
              )}
              {activeStep !== steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  다음
                </Button>
              ) : (
                <>
                  <Button sx={{ mt: 3, ml: 1 }}>
                    <img
                      src={require("../../img/payment_icon_yellow_medium.png")}
                      onClick={preparePayment}
                    />
                  </Button>
                </>
              )}
            </Box>
          </React.Fragment>
        )}
      </Paper>
      <Copyright />
    </Container>
  );
}
