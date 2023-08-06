import React, { useContext } from 'react';
import { Box, Button, Divider, List, ListItem, ListItemIcon } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Accordion from './Accordion';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AssignmentIcon from "@mui/icons-material/Assignment";
import AuthContext from '../../util/AuthContext';

const HamburgerMenu = (anchor) => {

  const { onLogout } = useContext(AuthContext);

  const redirection = useNavigate();

  const logoutHandler = e => {
    e.preventDefault();
    alert('로그아웃 되었습니다.');
    onLogout();
    redirection('/');
  };

  const handleWithdrawal = () => {
    if (window.confirm("정말로 회원 탈퇴하시겠습니까?")) {
      // 서버에 회원 탈퇴 요청을 보내는 코드
      fetch(REQUEST_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // 사용자 닉네임을 서버로 전송
      })
        .then((response) => {
          if (response.ok) {
            console.log("회원 탈퇴 성공");
            onLogout(); // 로그아웃 처리
            window.location.href = "/";
          } else {
            console.error("회원 탈퇴 실패");
            // 실패에 대한 처리를 진행
          }
        })
        .catch((error) => {
          console.error("회원 탈퇴 실패", error);
          // 실패에 대한 처리를 진행
        });
    }
  };

  return (
    <Box
      sx={{ width: '400px' }}
    // onClick={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem sx={{ cursor: 'default' }}>
          {/* 프로필 사진 */}
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #424180' }}>
            <img src={localStorage.getItem('LOGIN_USER_PFP') ? localStorage.getItem('LOGIN_USER_PFP') : require('../../img/profileImage.png')} width={'80px'} />
          </div>

          <div style={{ height: '70px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginLeft: '20px' }}>
            {localStorage.getItem('LOGIN_USER_NICK') ?
              (
                <>
                  <p style={{ fontSize: '18px', margin: 0 }}>
                    <span style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>
                      {localStorage.getItem('LOGIN_USER_NICK')}
                    </span>
                    님, 환영합니다!
                  </p>
                  <div style={{ display: 'flex' }}>
                    <Button style={{ backgroundColor: '#b1bff9', color: 'white', width: '80px', height: '30px', fontSize: '15px' }} onClick={logoutHandler}>로그아웃</Button>
                    <Button style={{ border: '1px solid #b1bff9', color: '#b1bff9', width: '80px', height: '30px', fontSize: '15px', marginLeft: '15px' }} onClick={handleWithdrawal}>회원 탈퇴</Button>
                  </div>
                </>
              ) : (
                <p>
                  로그인 후 이용해주세요.
                </p>
              )
            }
          </div>
        </ListItem>
      </List>
      <Divider />
      <List style={{ padding: 0, border: '0px' }}>
        {localStorage.getItem('LOGIN_USER_NICK')
          ?
          (<Accordion />)
          :
          (
            <>
              <ListItem>
                <Link to={'/login'} style={{ color: '#424180', display: 'flex', alignItems: 'center' }}>
                  <ListItemIcon>
                    <LockOutlinedIcon color='primary' />
                  </ListItemIcon>
                  로그인
                </Link>
              </ListItem>
              <ListItem>
                <Link to={'/join'} style={{ color: '#424180', display: 'flex', alignItems: 'center' }}>
                  <ListItemIcon>
                    <AssignmentIcon color='primary' />
                  </ListItemIcon>
                  회원가입
                </Link>
              </ListItem>
            </>
          )
        }
      </List>
    </Box >
  )
}

export default HamburgerMenu;