import "./App.css";
import { Route, Routes } from "react-router-dom";
import Join from "./component/user/Join";
import MyPage from "./component/user/MyPage";
import Profile from "./component/user/Profile";
import Sights from "./component/view/Sights";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthContextProvider } from "./util/AuthContext";
import ReservationCheck from "./component/reservation/ReservationCheck";
import Login from "./component/user/Login";
import Checkout from "./component/reservation/Checkout";
import Hotels from "./component/view/Hotels";
import HotelList from "./component/view/HotelList";
import Home from "./component/view/movie/pages/Home";
import TopRatedMovie from "./component/view/movie/pages/TopRatedMovie";
import NowPlayingMovie from "./component/view/movie/pages/NowPlayingMovie";
import Detail from "./component/view/movie/pages/Detail";
import MovieStateProvider from "./component/view/movie/provider/MovieStateProvider";
import UploadFreeBoard from "./component/freeboard/UploadFreeBoard";
import FreeBoardList from "./component/freeboard/FreeBoardList";
import FreeBoardDetail from "./component/freeboard/FreeBoardDetail";
import MyFreeBoardList from "./component/freeboard/MyFreeBoardList";
import SearchMovie from "./component/view/movie/pages/SearchMovie";
import HotelCheck from "./component/view/HotelCheck";
import HotelJoin from "./component/view/HotelJoin";

function App() {
  // 전체적 디자인
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
              <Route path="/" element={<Home />} />

              {/* 사용자 */}
              <Route path="/join" element={<Join />} />
              <Route path="/login" element={<Login />} />
              <Route path="/myPage" element={<MyPage />} />
              <Route path="/profile" element={<Profile />} />

              {/* 호텔 */}
              <Route path="/sights" element={<Sights />} />
              <Route path="/checkout/:id" element={<Checkout />} />
              <Route path="/reservationCheck" element={<ReservationCheck />} />
              <Route path="/hotelSearch" element={<Hotels />} />
              <Route path="/hotels" element={<HotelList />} />

              {/* 영화 */}
              <Route path="/hotelCheck" element={<HotelCheck />} />
              <Route path="/hotelJoin" element={<HotelJoin />} />
              <Route path="/now_playing" element={<NowPlayingMovie />} />
              <Route path="/topRated" element={<TopRatedMovie />} />
              <Route path="/movie/:movie_id" element={<Detail />} />
              <Route path="/search" element={<SearchMovie />} />

              {/* 후기 게시판 */}
              <Route path="/freeBoard/:id" element={<UploadFreeBoard />} />
              <Route path="/freeBoardList/:id" element={<FreeBoardList />} />
              <Route path="/myfreeBoardList" element={<MyFreeBoardList />} />
              <Route path="/freeBoardDetail" element={<FreeBoardDetail />} />
              <Route path="/search" element={<SearchMovie />} />
            </Routes>
          </ThemeProvider>
        </MovieStateProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
