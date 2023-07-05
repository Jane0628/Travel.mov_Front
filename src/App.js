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
      <Main />
      <MyPage />
      <Footer />
    </>
  );
}

export default App;