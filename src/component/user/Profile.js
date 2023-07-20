import React, { useContext, useRef, useState } from 'react';
import '../../design/profile.scss';
import { Grid, Button, TextField, InputLabel, OutlinedInput, InputAdornment, IconButton, FormControl, Input } from '@mui/material';
import { Container } from 'reactstrap';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { API_BASE_URL, USER } from '../../util/host-utils';
import Header from '../layout/Header';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { getLoginUserInfo } from '../../util/login-utils';
import AuthContext from '../../util/AuthContext';

const Profile = () => {
	const fileInputRef = useRef(null);

	const REQUEST_URL = API_BASE_URL + USER;

	const { nick, id, setNick } = useContext(AuthContext);

	const handleNickChange = (newNick) => {
		// 새로운 닉네임을 설정하고 상태를 업데이트합니다.
		setNick(newNick);
	};

	const redirection = useNavigate();

	// console.log(id);

	// 상태변수로 회원가입 입력값 관리
	const [userValue, setUserValue] = useState({
		id: id,
		pw: '',
		nick: '',
		email: '',
	});

	// 검증 메세지에 대한 상태변수 관리
	const [message, setMessage] = useState({
		pw: '',
		nick: '',
		email: '',
	});

	//검증 완료 체크에 대한 상태변수 관리
	const [correct, setCorrect] = useState({
		pw: 0,
		nick: 0,
		email: 0
	});

	//검증 데이터를 상태변수에 저장하는 함수
	const saveInputState = ({ key, inputVal, verification, msg }) => {

		setUserValue({
			...userValue,
			[key]: inputVal
		});

		setCorrect({
			...correct,
			[key]: verification
		});

		setMessage({
			...message,
			[key]: msg
		});
	}

	// 패스워드 입력창 체인지 이벤트 핸들러
	const passwordHandler = (e) => {
		const inputVal = e.target.value;

		const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

		let msg;
		let verification = 0;
		if (!inputVal) { //비밀번호 안적음
			msg = '비밀번호는 필수입니다.';
			verification = 1;
		} else if (!pwRegex.test(inputVal)) {
			msg = '8~20글자 영문, 숫자, 특수문자를 포함해 주세요.';
			verification = 1;
		} else {
			verification = 2;
			setCorrect({ ...correct, pw: verification });
		}

		saveInputState({
			key: 'pw',
			inputVal,
			msg,
			verification
		});
	};

	//닉네임 입력창 체인지 이벤트 핸들러
	const nameHandler = e => {
		const inputVal = e.target.value;
		const nameRegex = /^[가-힣a-z0-9]{2,10}$/;

		let msg;
		let verification = 0;
		if (!inputVal) {
			msg = '닉네임은 필수입니다.';
			verification = 1;
		} else if (!nameRegex.test(inputVal)) {
			msg = '2~10자 이내로 작성해주세요.';
			verification = 1;
		} else {
			verification = 2;
			setCorrect({ ...correct, nick: verification });
		}

		saveInputState({
			key: 'nick',
			inputVal,
			msg,
			verification
		});
	}

	// 이메일 입력창 체인지 이벤트 핸들러
	const emailHandler = (e) => {
		const inputVal = e.target.value;
		const emailRegex = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;

		let msg;
		let verification = 0;
		if (!inputVal) {
			msg = '이메일은 필수값입니다.';
			verification = 1;
		} else if (!emailRegex.test(inputVal)) {
			msg = '이메일 형식이 아닙니다.';
			verification = 1;
		} else {
			verification = 2;
			setCorrect({ ...correct, email: verification });
		}

		saveInputState({
			key: 'email',
			inputVal,
			msg,
			verification
		});
	}

	const [showPassword, setShowPassword] = useState(false);

	// 눈 클릭 시 비밀번호 보여주는/숨기는 메서드
	const showPasswordHandler = () => {
		setShowPassword(!showPassword);
	};

	// 이미지
	const [selectedImage, setSelectedImage] = useState(null);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		const imageUrl = URL.createObjectURL(file);

		if (file) setSelectedImage(imageUrl);
		else return;
	};

	const isValid = () => {
		for (const key in correct) {
			console.log(correct[key]);
			if (correct[key] !== 2) return false;
		}
		return true;
	}

	const fetchSignUpPost = () => {
		const userJsonBlob = new Blob([JSON.stringify(userValue)], { type: 'application/json' });

		const userFormData = new FormData();
		userFormData.append('user', userJsonBlob);
		userFormData.append('profileImage', fileInputRef.current.files[0]);

		fetch(REQUEST_URL, {
			method: 'PUT',
			body: userFormData,
		})
			.then((res) => {
				if (res.status === 200) {
					alert('수정이 완료되었습니다');
					localStorage.setItem('LOGIN_USERNICK', userValue.nick);
					redirection('/myPage');
				} else {
					alert('서버와의 통신이 원활하지 않습니다.');
				}
			});
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();

		// 닉네임 업데이트
		setNick(userValue.nick);

		// password, nickN, email 값 가져오기
		const passwordValue = document.getElementById('pw').value;
		const nickNValue = document.getElementById('nick').value;
		const emailValue = document.getElementById('email').value;

		// 가져온 값 사용 또는 처리
		console.log('Password:', passwordValue);
		console.log('NickName:', nickNValue);
		console.log('Email:', emailValue);

		if (isValid()) {
			fetchSignUpPost();
		} else {
			alert('입력란을 다시 확인해 주세요!');
		}

	};




	return (
		<>
			<Header />
			<Container>
				<form onSubmit={handleFormSubmit}>
					<h1>프로필 수정</h1>
					<div className='prof-main'>
						<div className='image'>
							<div>
								<img src={selectedImage ? selectedImage : require("../../img/profileImage.png")} alt="" />
								<Fab color="secondary" classes={'.file-label'} >
									<label htmlFor="fileInput-hidden">
										<EditIcon />
										<input id="fileInput-hidden" type="file" onChange={handleImageChange} accept="image/*" className="file-input" ref={fileInputRef} />
									</label>
								</Fab>
							</div>
						</div>
						<div className='profile'>
							<div className="right">
								<Grid item xs={8}>
									<TextField
										type="text"
										fullWidth
										id="id"
										label="아이디"
										name="id"
										value={id}
										disabled
									/>
								</Grid>
								<Grid item xs={8}>
									<div class="pwInput">
										<TextField
											type={showPassword ? 'text' : 'password'}
											fullWidth
											id="pw"
											label="비밀번호"
											name="pw"
											onChange={passwordHandler}
											error={correct.pw === 1 ? true : false}
											helperText={correct.pw === 1 ? message.pw : null}
										/>
										<IconButton
											aria-label="toggle password visibility"
											edge="end"
											onClick={showPasswordHandler}
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</div>
								</Grid>
								<Grid item xs={8}>
									<TextField
										variant="outlined"
										fullWidth
										id="nick"
										label="닉네임"
										name="nick"
										error={correct.nick === 1 ? true : false}
										helperText={correct.nick === 1 ? message.nick : null}
										defaultValue={localStorage.getItem("LOGIN_USERNICK")}
										onChange={nameHandler}
									/>
								</Grid>
								<Grid item xs={8}>
									<TextField
										variant="outlined"
										fullWidth
										id="email"
										label="이메일"
										name="email"
										autoComplete="email"
										error={correct.email === 1 ? true : false}
										helperText={correct.email === 1 ? message.email : null}
										// defaultValue={localStorage.getItem("email")}
										onChange={emailHandler}
									/>
								</Grid>
								<Grid item xs={8}>
									<Button
										type="submit"
										fullWidth
										variant="contained"
										color="primary"
										onClick={handleFormSubmit}
									> 변경할래요!
									</Button>
								</Grid>
							</div>
						</div>
					</div>
				</form>
			</Container>
		</>
	)
}

export default Profile;
