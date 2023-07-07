import React, { useContext } from 'react';
import logo from '../../img/logo.png';
import "../../design/header.scss";
import { Link, Router, useNavigate } from 'react-router-dom';
import AuthContext from '../../util/AuthContext';
import { isLogin } from '../../util/login-utils';

const Header = () => {

	const { isLoggdeIn, onLogout, id } = useContext(AuthContext);

	const redirection = useNavigate();

	const logoutHandler = e => {
		e.preventDefault();
		onLogout();
		redirection('/login')
	};

	return (
		<>
			<header>
				<img src={logo} alt="logo" />
				<div className="spans">
					<>
						{isLogin()
							?
							(
								<>
									<Link onClick={logoutHandler}
										id='logout'>
										로그아웃
									</Link>
									<Link to="/myPage">마이페이지</Link>
									<Link to="/profile">프로필 수정</Link>
								</>
							)
							:
							(
								<>
									<Link to='/login'>로그인</Link>
									<Link to='/join'>회원가입</Link>
								</>
							)
						}
					</>
				</div>
			</header>
		</>
	);
}

export default Header;