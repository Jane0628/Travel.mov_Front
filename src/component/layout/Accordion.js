import React, { useState } from 'react';
import { ListItem, ListItemIcon } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import RateReviewIcon from '@mui/icons-material/RateReview';
import HotelIcon from '@mui/icons-material/Hotel';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';

const Accordion = () => {
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    '&:before': {
      display: 'none',
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'light'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transition: '1s ease-in-out',
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Link to={'/myPage'} style={{ color: '#424180', display: 'flex', alignItems: 'center' }}>
            <ListItemIcon>
              <PersonIcon sx={{ width: '34.28px' }} color='primary' />
            </ListItemIcon>
            마이페이지
          </Link>
        </AccordionSummary>
        <AccordionDetails>
          {localStorage.getItem('isLoggedIn') == 1 ?
            (
              <ListItem>
                <Link to={'/profile'} style={{ color: '#424180', display: 'flex', alignItems: 'center' }}>
                  <ListItemIcon>
                    <ManageAccountsIcon color='primary' />
                  </ListItemIcon>
                  프로필 수정
                </Link>
              </ListItem>
            ) : null
          }
          <ListItem>
            <Link to={'/reservationCheck'} style={{ color: '#424180', display: 'flex', alignItems: 'center' }}>
              <ListItemIcon>
                <FactCheckIcon sx={{ width: '34.28px' }} color='primary' />
              </ListItemIcon>
              예약 정보 확인
            </Link>
          </ListItem>
          <ListItem>
            <Link to={'/myfreeBoardList'} style={{ color: '#424180', display: 'flex', alignItems: 'center' }}>
              <ListItemIcon>
                <RateReviewIcon sx={{ width: '34.28px' }} color='primary' />
              </ListItemIcon>
              나의 여행 후기
            </Link>
          </ListItem>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Link to={'/hotels'} style={{ color: '#424180', display: 'flex', alignItems: 'center' }}>
            <ListItemIcon>
              <HotelIcon sx={{ width: '34.28px' }} color='primary' />
            </ListItemIcon>
            호텔
          </Link>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Collapsible Group Item #3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default Accordion