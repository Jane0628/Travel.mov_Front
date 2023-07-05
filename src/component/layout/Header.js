import React from 'react';
import logo from '../../img/logo.png';
import "../../design/header.scss";
import { Link, Router } from 'react-router-dom';

const Header = () => {
	return (
		<>
			<header>
				<img src={logo} alt="logo" />
				<div className="spans">
					<span>로그인</span>
					<span>회원가입</span>
					<>
						<Link to="/myPage">마이페이지</Link>
						<Link to="/profile">프로필 수정</Link>
					</>
				</div>
			</header>
		</>
	);
}

export default Header;