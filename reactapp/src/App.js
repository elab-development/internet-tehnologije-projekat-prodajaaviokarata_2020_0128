import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './NeulogovaniKorisnik/PocetnaStranica/LandingPage';
import Login from './NeulogovaniKorisnik/Login/Login';
import Register from './NeulogovaniKorisnik/Register/Register';
import Navbar from './Navbar/Navbar';
import Letovi from './UlogovaniKorisnik/Letovi/Letovi';
import MojeKarte from './UlogovaniKorisnik/karte/MojeKarte';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  return (
    <Router>
      <div className="App">
      <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<LandingPage user={user} />} />
          <Route path="/mojeKarte" element={<MojeKarte  />} />

          <Route path="/letovi" element={<Letovi />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
