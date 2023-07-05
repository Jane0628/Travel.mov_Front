import './App.css';
import Header from './component/layout/Header';
import { Route, Routes } from 'react-router-dom';
import Profile from './component/user/Profile';
import Intro from './component/layout/Intro';
import Footer from './component/layout/Footer';
import Main from './component/layout/Main';

function App() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;