import React from 'react';
import '../design/intro.scss';
import { Link } from '@mui/material';

const Intro = () => {

  const textChange = e => {
    e.target.textContent = '떠나볼까?';
  }
  const returnText = e => {
    e.target.textContent = 'Tramovel'
  }
  return (
    <>
      <div className='intro-container'>

        <Link to='/Main' className='intro-title' onMouseEnter={textChange} onMouseLeave={returnText}>Tramovel</Link>

        <span className='intro-name'></span>
      </div>
    </>
  )
};

export default Intro;