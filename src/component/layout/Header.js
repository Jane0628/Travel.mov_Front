import React from 'react';
import logo from '../../img/logo.png';
import "../../design/header.scss";
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<>
			<header>
				<img src={logo} alt="logo" />
				<div className="spans">
					<span>로그인</span>
					<span>회원가입</span>
				</div>
			</header>
		</>
	);
}

export default Header;