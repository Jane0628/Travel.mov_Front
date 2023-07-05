import './App.css';
import Header from './component/layout/Header';
import { Route, Routes } from 'react-router-dom';
import Main from './component/layout/Main';
import Login from './component/user/Login';
import Join from './component/user/Join';
import MyPage from './component/user/MyPage';
import Profile from './component/user/Profile';
import Footer from './component/layout/Footer';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/join' element={<Join />} />
        <Route path='/myPage' element={<MyPage />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;