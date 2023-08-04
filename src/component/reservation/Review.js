import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";

export default function Review({
  name,
  date,
  payment,
  product,
  discount,
  total,
}) {
  return (
    <React.Fragment>
      <ListItem key={product} sx={{ py: 1, px: 0 }}>
      <ListItemText>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
          예약자 정보
        </Typography>
      </ListItemText>
        <Typography gutterBottom>{name}님</Typography>
      </ListItem>
        <Grid item xs={12} sm={6}>
        <ListItemText>
        <Typography variant="h6" gutterBottom sx={{ mt: 1, fontWeight: 700 }}>
          숙박 기한
        </Typography>
        </ListItemText>
        <Typography gutterBottom>
            {date.startDate.toLocaleString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            ~
            {date.endDate.toLocaleString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            ({date.days}박 {date.days + 1}일)
          </Typography>
        </Grid>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
          할인 및 결제
        </Typography>
      <List disablePadding>
        <ListItem key={product} sx={{ py: 1, px: 0 }}>
          <ListItemText primary="상품가격" />
          <Typography variant="body2">
            {payment.toLocaleString()} x {date.days}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="쿠폰 할인금액" />
          <Typography variant="subtitle1">
            {discount.toLocaleString()}￦
          </Typography>
        </ListItem>
      </List>
        <Grid xs={12} sm={6}>
          <ListItem key={product} sx={{ py: 1, px: 0 }}>
          <ListItemText>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              총금액
            </Typography>
          </ListItemText>
            <React.Fragment key={payment}>
              <Typography gutterBottom>
                {(total - discount).toLocaleString()}￦
              </Typography>
            </React.Fragment>
          </ListItem>
        </Grid>
    </React.Fragment>
  );
}
