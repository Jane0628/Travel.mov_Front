import './App.css';
import Intro from './component/layout/intro/Intro';
import Header from './component/layout/Header';
import { Route, Routes } from 'react-router-dom';
import Main from './component/layout/Main';
import Login from './component/user/Login';
import Join from './component/user/Join';
import MyPage from './component/user/MyPage';
import Profile from './component/user/Profile';
import Footer from './component/layout/Footer';
import Sights from './component/layout/Sights';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AuthContextProvider } from './util/AuthContext';
import ReservationCheck from './component/reservation/ReservationCheck';
import SignInSide from './component/layout/intro/SignInSide';

function App() {
	const theme = createTheme({
		palette: {
			mode: 'light',
			primary: {
				main: '#b1bff9',
				contrastText: '#fff',
			},
			secondary: {
				main: '#5c71e8',
			},
			divider: '#424180',
			text: {
				primary: '#424180',
			},
		},
		shape: {
			borderRadius: 5,
		},
		typography: {
			fontFamily: 'S-CoreDream',
			fontSize: 20
		},
		components: {
			MuiCssBaseline: {
				styleOverrides: `
        @font-face {
					font-family: 'S-CoreDream';
					src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-6Bold.woff') format('woff');
					font-weight: 600;
					font-style: normal;
				}
        `
			},
		},
	});

	return (
		<>
			<AuthContextProvider>
				<ThemeProvider theme={theme}>
					<Header />
					<Routes>
						<Route path='/' element={<Main />} />
						<Route path='/login' element={<SignInSide />} />
						<Route path='/join' element={<Join />} />
						<Route path='/myPage' element={<MyPage />} />
						<Route path='/profile' element={<Profile />} />
						<Route path='/sights' element={<Sights />} />
						<Route path='/reservationCheck' element={<ReservationCheck />} />
					</Routes>
					<Footer />
				</ThemeProvider>
			</AuthContextProvider>
		</>
	);
}

export default App;