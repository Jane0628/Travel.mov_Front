import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";

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
      <Typography variant="h6" gutterBottom>
        예약 정보 확인
      </Typography>
      <List disablePadding>
        <ListItem key={product} sx={{ py: 1, px: 0 }}>
          <ListItemText primary="상품가격" />
          <Typography variant="body2">{payment}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="쿠폰 할인가" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {discount}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            예약자 정보
          </Typography>
          <Typography gutterBottom>{name}님</Typography>
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
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            총금액
          </Typography>
          <Grid container>
            <React.Fragment key={payment}>
              <Grid item xs={6}>
                <Typography gutterBottom>{total}</Typography>
              </Grid>
            </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
