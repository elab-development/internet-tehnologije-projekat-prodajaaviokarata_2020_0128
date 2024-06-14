import React from 'react';
import axios from 'axios';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const handleLogout = async () => {
    const token = sessionStorage.getItem('token');
    try {
      await axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('There was an error logging out:', error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" style={{color:"white"}} className="navbar-logo">BestFlights</Link>
      <ul className="navbar-links">
        {user ? (
           <>
            <li className="navbar-item">
              <a className="navbar-link" href="/letovi">Letovi</a>
            </li>
            <li className="navbar-item">
              <a className="navbar-link" href="/mojeKarte">Moje karte</a>
            </li>
              <li className="navbar-item">
                <button className="navbar-button" onClick={handleLogout}>Logout</button>
              </li>
          </>
        ) : (
          <>
            <li className="navbar-item">
              <a className="navbar-link" href="/login">Login</a>
            </li>
            <li className="navbar-item">
              <a className="navbar-link" href="/register">Register</a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
