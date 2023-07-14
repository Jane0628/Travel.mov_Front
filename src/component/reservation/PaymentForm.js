import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import { getLoginUserInfo } from "../../util/login-utils";
import axios from "axios";

export default function PaymentForm() {
  const redirection = useNavigate();

  // 로그인 인증 토큰 얻어오기
  const [token, setToken] = React.useState(getLoginUserInfo().token);

  const preparePayment = async () => {
    const res = await fetch("http://localhost:8181/pay/ready", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        partner_order_id: "partner_order_id", // 가맹점에서 관리하는 주문번호
        partner_user_id: "partner_user_id", // 가맹점에서 관리하는 회원고유번호
        item_name: "초코파이",
        quantity: 1,
        total_amount: 2200, // 결제 금액
        vat_amount: 200,
        tax_free_amount: 0,
      }),
    });
    console.log(res);

    const { next_redirect_pc_url, tid } = await res.json();
    console.log(tid);
    console.log(next_redirect_pc_url);
    window.location.href = next_redirect_pc_url;
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        카카오페이로 결제하기
      </Typography>
      <Grid container spacing={3}>
        {/* <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid> */}
        <img
          src={require("../../img/payment_icon_yellow_large.png")}
          onClick={preparePayment}
        />
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}
