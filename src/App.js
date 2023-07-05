import './App.css';
import Header from './component/layout/Header';
import { Route, Routes } from 'react-router-dom';
import Profile from './component/user/Profile';
import Intro from './component/layout/Intro';
import Footer from './component/layout/Footer';
import Main from './component/layout/Main';
import MyPage from './component/user/MyPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/myPage' element={<MyPage />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;