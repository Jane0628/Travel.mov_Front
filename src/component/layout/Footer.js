import React from 'react'
import { Image } from 'react-bootstrap';
import '../../design/layout/footer.scss';

const Footer = () => {
  return (
    <>
      <footer>
        <Image src={require('../../img/logo.png')} width={80} />
        <div className="about">
          <span className="title">ABOUT</span>
          대표 :
          Tel
        </div>
      </footer>
    </>
  );
}

export default Footer;