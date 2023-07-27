import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    Link,
    OutlinedInput,
    TextField,
    ThemeProvider,
    Typography,
    createTheme,
  } from "@mui/material";
  import "../../design/join.scss";
  import React, { useContext, useEffect, useState } from "react";
  import { useNavigate } from "react-router";
  import { Copyright, Visibility, VisibilityOff } from "@mui/icons-material";
  import AuthContext from "../../util/AuthContext";
  import { API_BASE_URL, USER } from "../../util/host-utils";
  import LockIcon from '@mui/icons-material/Lock'
  import Header from "../layout/Header";
  

const ChangePw = () => {
  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            비밀번호 변경
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="id"
                  label="아이디"
                  name="id"
                  required
                  
                  onChange
                />
                <Button
                  type="button"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick
                  className="check-btn"
                  disabled
                >
                  중복체크
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="currentPw"
                  label="현재 비밀번호"
                  name="currentPw"
                  
                  onChange
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  
                  fullWidth
                  id="changePw"
                  label="변경할 비밀번호"
                  name="changePw"
                  required
                  onChange
                  
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick>
                          
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>  
            </Grid>
            <div className="buttons">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                변경하기
              </Button>
            </div>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  돌아가기
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ChangePw;