import React from 'react';
import logo from '../../logo.png';
import "./header.scss";
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<>
			<header>
				<img src={logo} alt="logo" />
				로그인
				회원가입
			</header>
		</>
	);
}

export default Header;