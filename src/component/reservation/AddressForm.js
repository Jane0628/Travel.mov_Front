import * as React from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";

export default function AddressForm({ start, end }) {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  function checkIn(date) {
    setStartDate(date);
    start(
      date.toLocaleString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }
  function checkout(date) {
    setEndDate(date);
    end(
      date.toLocaleString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        예약자 정보 입력
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="이름"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} className="datepicker-container">
          <DatePicker
            dateFormat="yyyy/MM/dd"
            selected={startDate}
            onChange={(date) => checkIn(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            locale={ko}
          />
          <DatePicker
            dateFormat="yyyy/MM/dd"
            selected={endDate}
            onChange={(date) => checkout(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            locale={ko}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid> */}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="이 정보를 결제 정보에 저장합니다."
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
