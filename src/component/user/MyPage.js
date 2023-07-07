import React from 'react'
import "../../design/mypage.scss"
import { Button, Grid, Container} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const MyPage = () => {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#7b8ce0',
      },
    },
  });

  return (
    <>
      <Container>
        <h1>My Page</h1>
        <div className='my-page'>
            <div className='welcome'>
              <Grid item xs={8} style={{ backgroundColor: 'blue' }}>                            
                <img                                    
                  src={require("../../img/profileImage.png") }
                  alt="profile"                                    
                  />
              </Grid>
              <div className='nick'>
                심청이님 <br />
                환영합니다
              </div>
            </div>
            <div className='page-menu'>

              <Link to="/profile" className='link'>프로필 수정</Link>
              <span>영화 촬영지 여행 후기</span>
              <span>찜 목록</span>
              <span>으핫</span>

              <div className='delete'>
                <ThemeProvider theme={theme}>
                  <Button variant="contained" color="primary" className={`custom-button small`}>
                    회원 탈퇴
                  </Button>
                </ThemeProvider>
                </div>

            </div>
        </div>
      </Container>
    </>
  )
}

export default MyPage