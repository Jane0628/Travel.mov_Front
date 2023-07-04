import React from 'react';
import logo from '../../assets/img/logo.png';
import "../../design/header.scss";
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<>
			<header>
				<img src={logo} alt="logo" />
				<span>로그인</span>
				<span>회원가입</span>
			</header>
		</>
	);
}

export default Header;