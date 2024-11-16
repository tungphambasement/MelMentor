import { useContext, useState } from 'react';
import './App.css';
import {AuthContext, AuthProvider} from './services/auth.service';
import SignUp from './components/SignUp/signup.component';
import Login from './components/Login/login.component';
import Home from './pages/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar/navbar.component';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar/>
        <Routes>
            <Route exact path='/' element={<Home/>}></Route>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
