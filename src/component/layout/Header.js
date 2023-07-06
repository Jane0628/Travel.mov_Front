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
					<>
						<Link to="/login">로그인</Link>
						<Link to="/join">회원가입</Link>
						<Link to="/myPage">마이페이지</Link>
						<Link to="/profile">프로필 수정</Link>
					</>
				</div>
			</header>
		</>
	);
}

export default Header;