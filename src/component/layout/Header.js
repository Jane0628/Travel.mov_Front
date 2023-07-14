import React, { useContext } from 'react';
import logo from '../../img/logo.png';
import "../../design/layout/header.scss";
import { Link, Router, useNavigate } from 'react-router-dom';
import AuthContext from '../../util/AuthContext';

const Header = () => {

	const { isLoggedIn, onLogout, nick } = useContext(AuthContext);

	const redirection = useNavigate();

	const moveToMainPage = () => {
		redirection('/');
	}

	const logoutHandler = e => {
		e.preventDefault();
		alert('로그아웃 되었습니다');
		onLogout();
		redirection('/login');
	};

	return (
		<>
			<header>
				<img src={logo} alt="logo" onClick={moveToMainPage} />
				<div className="spans">
					<>
						{isLoggedIn ?
							(<>
								<Link to="/" onClick={logoutHandler} >로그아웃</Link>
								<Link to="/myPage">마이페이지</Link>
							</>)
							:
							(<>
								<Link to='/login'>로그인</Link>
								<Link to='/join'>회원가입</Link>
							</>)
						}
					</>
				</div>
			</header>
		</>
	);
}

export default Header;