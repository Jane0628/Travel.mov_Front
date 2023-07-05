import './App.css';
import Header from './component/layout/Header';
import { Route, Routes } from 'react-router-dom';
import Profile from './component/user/Profile';
import Intro from './component/layout/Intro';
import Footer from './component/layout/Footer';

function App() {
  return (
    <>
      <Header />
      <Profile />
      <Footer />
    </>
  );
}

export default App;