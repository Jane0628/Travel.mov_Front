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

  return (
    <Box
      sx={{ width: '400px' }}
    // onClick={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem sx={{ cursor: 'default' }}>
          <div style={{ borderRadius: '50%', overflow: 'hidden' }}>
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
                    님
                  </p>
                  <Button style={{ backgroundColor: '#b1bff9', color: 'white', width: '80px', height: '30px', fontSize: '15px' }} onClick={logoutHandler}>로그아웃</Button>
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
    </Box>
  )
}

export default HamburgerMenu;