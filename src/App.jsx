import './App.css';
import {LoginPage, RegisterPage } from './Pages/index.js';
import Welcome from './Pages/Welcome/Welcome.jsx';
import { Route, BrowserRouter, Routes  } from 'react-router-dom';

function App(){

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<LoginPage/>}></Route>
        <Route path="/register" exact element={<RegisterPage/>}></Route>
        <Route path="/login" exact element={<LoginPage/>}></Route>
        <Route path="/welcome" exact element={<Welcome/>}></Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
