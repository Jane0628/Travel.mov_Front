import './App.css';
import Header from './component/layout/Header';
import { Route, Routes } from 'react-router-dom';
import Profile from './user/Profile';
import Intro from './layout/Intro';
import Join from './user/Join';
import Login from './user/Login';

function App() {
  return (
    <>
      <Login />
    </>
  );
}

export default App;