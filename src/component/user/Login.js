import { Button, Container, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { async } from 'q';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Input } from '@mui/base';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import '../../design/login.scss';
import AuthContext from '../../utill/AuthContext';
import { API_BASE_URL, USER } from '../../utill/host-utils';

const Login = () => {

	const redirection = useNavigate();

	const {onLogin, isLoggedIn} = useContext(AuthContext);

	const REQUEST_URL = API_BASE_URL + USER;

	//로그인 중일시 메인으로
	useEffect(() => {
		if(isLoggedIn) {
			redirection('/');
		}
	});

  // 로그인 요청 함수
	const fetchLogin = async () => {

		const $id = document.getElementById('id');
		const $pw = document.getElementById('pw');
		if(!$id.value) {
			alert('아이디를 입력하세요');
			return;
		}
		if(!$pw.value) {
			alert('비밀번호를 입력하세요!')
			return;
		}
		console.log($id.value);

		const res = await fetch(`${REQUEST_URL}/signin`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				id: $id.ariaValueMax,
				password: $pw.value
			})
		});

		if (res.status === 400) {
			const text = await res.text();
			alert(text);
			return;
		}

		const { token, userName } = await res.json();
		console.log(res.json);

		onLogin(token, $id);
		redirection('/');

	};

  // 로그인 버튼 클릭 이벤트
	const loginHandler = e => {
		e.preventDefault();
		fetchLogin();
	};

	const [showPassword, setShowPassword] = useState(false);

	// 눈 클릭 시 비밀번호 보여주는/숨기는 메서드
	const showPasswordHandler = () => {
		setShowPassword(!showPassword);
	};

	return (
		<>
			<Container>
				<h1>로그인</h1>
				<form noValidate onSubmit={loginHandler}>
					<Grid item xs={8}>
						<TextField id="id" label="아이디" variant="outlined" size='small' />
					</Grid>
					<Grid item xs={8}>
						<FormControl sx={{ width: '400px' }} variant="outlined" size='small'>
							<InputLabel>비밀번호</InputLabel>
							<OutlinedInput
								autoComplete="off"
								id="pw"
								type={showPassword ? 'text' : 'password'}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={showPasswordHandler}
											edge="end"
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
								label="Password"
							/>
						</FormControl>
					</Grid>
					<div className="buttons">
						<Button
							type='submit'
							variant='contained'
						> 로그인
						</Button>
						<Button href='/join'
							type='button'
							variant='contained'
							color='primary'
						> 회원가입
						</Button>
					</div>
				</form>
			</Container>
		</>
)};

export default Login;