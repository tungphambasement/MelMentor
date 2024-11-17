import { useContext, useState } from 'react';
import './App.css';
import { AuthContext, AuthProvider } from './services/auth.service';
import SignUp from './components/SignUp/signup.component';
import Login from './components/Login/login.component';
import Home from './pages/Home/Home.jsx';
import Profile from './pages/Profile/Profile.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/navbar.component';

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile/>}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
