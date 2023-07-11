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
import Checkout from './component/reservation/Checkout';

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
					src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-1Thin.woff') format('woff');
					font-weight: 100;
					font-style: normal;
		 		}
        `,
				styleOverrides: `
        @font-face {
					font-family: 'S-CoreDream';
					src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-2ExtraLight.woff') format('woff');
					font-weight: 200;
					font-style: normal;
		 		}
        `,
				styleOverrides: `
        @font-face {
					font-family: 'S-CoreDream';
					src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
					font-weight: 300;
					font-style: normal;
		 		}
        `,
				styleOverrides: `
        @font-face {
					font-family: 'S-CoreDream';
					src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-4Regular.woff') format('woff');
					font-weight: 400;
					font-style: normal;
		 		}
        `,
				styleOverrides: `
        @font-face {
					font-family: 'S-CoreDream';
					src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-5Medium.woff') format('woff');
					font-weight: 500;
					font-style: normal;
		 		}
        `,
				styleOverrides: `
        @font-face {
					font-family: 'S-CoreDream';
					src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-6Bold.woff') format('woff');
					font-weight: 600;
					font-style: normal;
				}
        `,
				styleOverrides: `
        @font-face {
					font-family: 'S-CoreDream';
					src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-7ExtraBold.woff') format('woff');
					font-weight: 700;
					font-style: normal;
				}
        `,
				styleOverrides: `
        @font-face {
					font-family: 'S-CoreDream';
					src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-8Heavy.woff') format('woff');
					font-weight: 800;
					font-style: normal;
				}
        `,
				styleOverrides: `
				@font-face {
					font-family: 'S-CoreDream';
					src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-9Black.woff') format('woff');
					font-weight: 900;
					font-style: normal;
				 }
				`,
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
						<Route path='/myPage' element={<MyPage />} />-
						<Route path='/profile' element={<Profile />} />
            <Route path='/sights' element={<Sights />} />
            			<Route path='/checkout' element={<Checkout />} />
            <Route path='/reservationCheck' element={<ReservationCheck />} />
					</Routes>
					<Footer />
				</ThemeProvider>
			</AuthContextProvider>
		</>
	);
}

export default App;