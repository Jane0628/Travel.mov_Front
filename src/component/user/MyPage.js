import React, { useContext } from 'react'
import "../../design/mypage.scss"
import { Button, Grid, Container} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import AuthContext from '../../util/AuthContext';
import { API_BASE_URL, USER } from '../../util/host-utils';

const MyPage = () => {

  const {isLoggedIn, onLogout, nick} = useContext(AuthContext);

  const REQUEST_URL = API_BASE_URL + USER;

  console.log(nick);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#7b8ce0',
      },
    },
  });

  const handleWithdrawal = () => {
    if (window.confirm('정말로 회원 탈퇴하시겠습니까?')) {
      // 서버에 회원 탈퇴 요청을 보내는 코드
      fetch(REQUEST_URL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nick }), // 사용자 닉네임을 서버로 전송
      })
        .then((response) => {
          if (response.ok) {
            console.log('회원 탈퇴 성공');
            onLogout(); // 로그아웃 처리
            window.location.href = '/';
          } else {
            console.error('회원 탈퇴 실패');
            // 실패에 대한 처리를 진행
          }
        })
        .catch((error) => {
          console.error('회원 탈퇴 실패', error);
          // 실패에 대한 처리를 진행
        });
    }
  };

  return (
    <>
      <Container>
        <h1>My Page</h1>
        <div className='my-page'>
            <div className='welcome'>
              <Grid item xs={8} /*</div>style={{ backgroundColor: 'blue' }}*/>                            
                <img                                    
                  src={require("../../img/profileImage.png") }
                  alt="profile"                                    
                  />
              </Grid>
              <div className='nick'>
              {
                nick + '님 '
                + '환영합니다'
              }
              </div>
            </div>
            <div className='page-menu'>

              <Link to="/profile" className='link'>프로필 수정</Link>
              <span>영화 촬영지 여행 후기</span>
              <Link to="/hotels" className='link'>호텔 예약 하기</Link>
              <Link to="/reservationCheck" className='link'>호텔 예약 정보 확인</Link>
              <Link to="/" className='link'>홈페이지</Link>

              <div className='delete'>
                <ThemeProvider theme={theme}>
                  <Button
                    variant='contained'
                    color='primary'
                    className={`custom-button small`}
                    onClick={handleWithdrawal}
                  >
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