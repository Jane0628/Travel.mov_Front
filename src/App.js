import logo from './logo.svg';
import './App.css';
import Intro from './layout/Intro';
import { Route, Routes } from 'react-router';
import Login from './user/Login';
import Join from './user/Join';

function App() {
  return (
    <div className="App">
      <Login/>
      {/* <div className='content-wrapper'>
          <Routes>
            <Route path='/' element={ <Intro/>}/>
            <Route path='/login' element={ <Login/>}/>
            <Route path='/join' element={ <Join/>}/>
          </Routes>
        </div> */}
    </div>
  );
}

export default App;
