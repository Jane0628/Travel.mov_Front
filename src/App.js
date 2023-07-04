import './App.css';
import Header from './component/layout/Header';
import { Route, Routes } from 'react-router-dom';
import Profile from './user/Profile';

function App() {
  return (
    <>
      <Header />
      <Profile />
    </>
  );
}

export default App;