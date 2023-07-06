import React from 'react'
import '../../design/profile.scss'
import { Grid, Button, TextField } from '@mui/material';
import { Input } from '@mui/base';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Profile = () => {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#7b8ce0',
      },
    },
  });

  return (
    <>
      <h1>회원 정보 수정</h1>
      <div className='prof-main'>
        <div className='image'>
          <Grid item xs={8}>                            
            <img                                    
              src={require("../../img/profileImage.png") }
              alt="profile"                                    
            />
          </Grid>
          <label className='image-change' htmlFor='profile-img'>프로필 이미지 설정</label>
        </div>
        <div className='profile'>
          <div className="right">            
            <Grid item xs={8}>
              <TextField
                type="text"
                required
                fullWidth
                id="id"
                label="아이디"
                name="id"
                value={'SimChung2'}
                readOnly
              />
            </Grid>            
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password"
                label="비밀번호"
                name="password"
                autoComplete="password"
                type="password"
              />
            </Grid>            
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="nick"
                label="닉네임"
                name="nick"
                autoComplete="nick"
              />
            </Grid>            
            <Grid item xs={8}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="이메일"
                name="email"
                autoComplete="email"
              />
            </Grid>            
          </div>
            <a>
              <div className='change'>
              <ThemeProvider theme={theme}>
                <Button variant="contained" color="primary" className={`custom-button small`}>
                  변경할래요
                </Button>
              </ThemeProvider>
              </div>
              <div className='no-change'>
              <ThemeProvider theme={theme}>
                <Button variant="contained" color="primary" className={`custom-button small`}>
                  변경안해요
                </Button>
              </ThemeProvider>
              </div>
            </a>
        </div>
      </div>
    </>
  )
}

export default Profile