import React, { useState, useEffect } from 'react';
import './App.css';
import LandingPage from './NeulogovaniKorisnik/PocetnaStranica/LandingPage';
import Login from './NeulogovaniKorisnik/Login/Login';
import Register from './NeulogovaniKorisnik/Register/Register';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="App">
      <Register></Register>
      <LandingPage user={user} />   
      <Login setUser={setUser}/> 
    </div>
  );
}

export default App;
