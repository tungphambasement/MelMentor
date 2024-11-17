import { useContext, useState } from 'react';
import './App.css';
import { AuthContext, AuthProvider } from './services/auth.service';
import SignUp from './components/SignUp/signup.component';
import Login from './components/Login/login.component';
import Home from './pages/Home/Home.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/navbar.component';
import Mentors from './pages/Mentors/Mentors.jsx';
import Profile from './pages/Profile/Profile.jsx';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <div className='App'>
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/mentors' element={<Mentors />} />
            <Route path='/profile/:id' element={<Profile />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
