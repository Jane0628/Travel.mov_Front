import { Button, Container, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { async } from 'q';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { Input } from '@mui/base';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {

	// const redirection = useNavigate();

	const fetchLogin = async () => {

		const $id = document.getElementById('id');
		const $pw = document.getElementById('pw');

		console.log($id.value);

		const res = await fetch('http://localhost:8181/api/auth/signin', {
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

		// OnLogin(token, id);
		// redirection('/');

	}

	const loginHandler = e => {
		e.preventDefault();

		fetchLogin();
	}

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
						<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" size='small'>
							<InputLabel htmlFor="outlined-adornment-password">비밀번호</InputLabel>
							<OutlinedInput
								id="outlined-adornment-password"
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
					<Grid item xs={8}>
						<Button
							type='submit'
							fullWidth
							variant='contained'
						> 로그인
						</Button>
					</Grid>
					<Grid item xs={8}>
						<Button href='/join'
							type='button'
							fullWidth
							variant='contained'
							color='primary'
						> 회원가입
						</Button>
					</Grid>
				</form>
			</Container>
		</>
	);
};

export default Login;