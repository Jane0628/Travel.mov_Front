import './App.css';
import Intro from './component/layout/Intro';
import Header from './component/layout/Header';
import { Route, Routes } from 'react-router-dom';
import Main from './component/layout/Main';
import Login from './component/user/Login';
import Join from './component/user/Join';
import MyPage from './component/user/MyPage';
import Profile from './component/user/Profile';
import Footer from './component/layout/Footer';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
      fontFamily: 'GangwonEdu',
      fontSize: 20
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
        @font-face {
          font-family: 'GangwonEdu';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/GangwonEdu_OTFLightA.woff') format('woff');
          font-weight: normal;
          font-style: normal;
        }
        `,
        styleOverrides: `
        @font-face {
          font-family: 'GangwonEdu';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/GangwonEdu_OTFBoldA.woff') format('woff');
          font-weight: bold;
          font-style: normal;
        }
        `
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Intro />
        {/* <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/join' element={<Join />} />
          <Route path='/myPage' element={<MyPage />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
        <Footer /> */}
      </ThemeProvider>
    </>
  );
}

export default App;