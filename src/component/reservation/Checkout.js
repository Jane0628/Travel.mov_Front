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
import { useNavigate } from "react-router-dom";
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
  const [name, setName] = React.useState();
  const redirection = useNavigate();

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            start={startHandler}
            end={endHandler}
            name={nameHandler}
          />
        );
      case 1:
        return <PaymentForm payment />;
      case 2:
        return <Review name={name} date={{ startDate, endDate }} payment />;
      default:
        throw new Error("Unknown step");
    }
  }
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
  const nameHandler = (inputName) => {
    console.log(inputName);
    setName(inputName);
  };

  // 로그인 인증 토큰 얻어오기
  const [token, setToken] = React.useState(getLoginUserInfo().token);
  const [userNick, setUserNick] = React.useState(getLoginUserInfo().username);

  const preparePayment = async () => {
    const res = await fetch("http://localhost:8181/pay/ready", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        partner_order_id: name, // 가맹점에서 관리하는 주문번호
        partner_user_id: userNick, // 가맹점에서 관리하는 회원고유번호
        item_name: "호텔이름",
        item_code: "호텔id",
        quantity: 1,
        total_amount: 2200, // 결제 금액
        vat_amount: 200,
        tax_free_amount: 0,
        start_date: startDate,
        end_date: endDate,
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
              Your order number is #2001539. We have emailed your order
              confirmation, and will send you an update when your order has
              shipped.
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

              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? (
                  <>
                    <Typography variant="h6" gutterBottom>
                      결제하기
                    </Typography>
                    <img
                      src={require("../../img/payment_icon_yellow_medium.png")}
                      onClick={preparePayment}
                    />
                  </>
                ) : (
                  "다음"
                )}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Paper>
      <Copyright />
    </Container>
  );
}
