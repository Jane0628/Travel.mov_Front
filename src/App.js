import './App.css';
import Header from './component/layout/Header';
import { Route, Routes } from 'react-router-dom';
import Profile from './user/Profile';
import Intro from './layout/Intro';

function App() {
  return (
    <>
      <Profile />
    </>
  );
}

export default App;