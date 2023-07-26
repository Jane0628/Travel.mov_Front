import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { getLoginUserInfo } from "../../util/login-utils";
import { API_BASE_URL } from "../../util/host-utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { FormControl } from "react-bootstrap";

export default function PaymentForm({ value }) {
  const token = getLoginUserInfo().token;
  const redirection = useNavigate();
  const [couponList, setCouponList] = useState([]);
  const [coupon, setCoupon] = useState();

  const requestHeader = {
    "content-type": "application/json",
    Authorization: "Bearer " + token,
  };
  useEffect(() => {
    //페이지가 렌더링 되면 쿠폰목록 보여주기.
    fetch(`${API_BASE_URL}/coupon`, {
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
        console.log(json.couponList);

        //fetch를 통해 받아온 데이터를 상태 변수에 할당.
        if (json) setCouponList(json.couponList);
      });
  }, []);
  const total = value.hotel.price * value.days;
  value.pay(total);

  const handleChange = (e) => {
    setCoupon(e.target.value);
    console.log(e.target.value.discountPrice);
    value.point(e.target.value.discountPrice);
    console.log(e.target.value.id);
    value.coupon(e.target.value.id);
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} sx={{ fontWeight: 700, fontSize: 30 }}>
          가격
        </Grid>
        <Grid item xs={12} md={6}>
          {value.hotel.price}원
        </Grid>
        <Grid item xs={12} md={6} sx={{ fontWeight: 700, fontSize: 30 }}>
          기간
        </Grid>
        <Grid item xs={12} md={6}>
          {value.days}박 {value.days + 1}일
        </Grid>
        <Grid item xs={12} md={6} sx={{ fontWeight: 700, fontSize: 30 }}>
          총 금액
        </Grid>
        <Grid item xs={12} md={6}>
          {total}원
        </Grid>
        <Typography variant="h6" gutterBottom>
          적용가능 쿠폰
        </Typography>

        <TextField
          select
          id="demo-simple-select"
          value={coupon}
          label="쿠폰"
          onChange={handleChange}
        >
          {couponList.map(
            (coupon) =>
              coupon.status === 1 && (
                <MenuItem key={coupon.id} value={coupon}>
                  {coupon.name}
                </MenuItem>
              )
          )}
        </TextField>

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
