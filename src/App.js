import "./App.css";
import Header from "./component/layout/Header";
import { Route, Routes } from "react-router-dom";
import Main from "./component/layout/main/Main";
import Join from "./component/user/Join";
import MyPage from "./component/user/MyPage";
import Profile from "./component/user/Profile";
import Footer from "./component/layout/Footer";
import Sights from "./component/view/Sights";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthContextProvider } from "./util/AuthContext";
import ReservationCheck from "./component/reservation/ReservationCheck";
import Login from "./component/user/Login";
import Checkout from "./component/reservation/Checkout";
import Hotels from "./component/view/Hotels";
import TodaysMovieDetail from "./component/view/movie/TodaysMovieDetail";
import Home from "./component/view/movie/pages/Home";
import NowPlayingMovie from "./component/view/movie/pages/NowPlayingMovie";
import UpcomingMovie from "./component/view/movie/pages/UpcomingMovie";
import Detail from "./component/view/movie/pages/Detail";
import MovieStateProvider from "./component/view/movie/provider/MovieStateProvider";

function App() {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#b1bff9",
        contrastText: "#fff",
      },
      secondary: {
        main: "#424180",
      },
      divider: "#424180",
      text: {
        primary: "#424180",
      },
    },
    shape: {
      borderRadius: 5,
    },
    typography: {
      fontFamily: "S-CoreDream",
      fontSize: 20,
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
        `,
      },
    },
  });

  return (
    <>
      <AuthContextProvider>
        <MovieStateProvider>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/join" element={<Join />} />
              <Route path="/login" element={<Login />} />
              <Route path="/myPage" element={<MyPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/sights" element={<Sights />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/reservationCheck" element={<ReservationCheck />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/TodaysMovieDetail" element={<TodaysMovieDetail />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/now_playing" element={<NowPlayingMovie />} />
              <Route path="/upcoming" element={<UpcomingMovie />} />
              <Route path="/movie/:movie_id" element={<Detail />} />
            </Routes>
          </ThemeProvider>
        </MovieStateProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
