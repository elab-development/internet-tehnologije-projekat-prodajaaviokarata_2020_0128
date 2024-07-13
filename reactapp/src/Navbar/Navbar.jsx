import React from 'react';
import axios from 'axios';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  let navigate = useNavigate();

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
      navigate("/");
      setUser(null);
    } catch (error) {
      console.error('There was an error logging out:', error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">BestFlights</Link>
      <ul className="navbar-links">
        {user ? (
          user.role === 'admin' ? (
            <>
              <li className="navbar-item">
                <Link to="/letovi" className="navbar-link">Letovi</Link>
              </li>
              <li className="navbar-item">
                <Link to="/rezervacije" className="navbar-link">Rezervacije</Link>
              </li>
              <li className="navbar-item">
                <Link to="/statistike" className="navbar-link">Statistike</Link>
              </li>
              <li className="navbar-item">
                <button className="navbar-button" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/mojeKarte" className="navbar-link">Moje karte</Link>
              </li>
              <li className="navbar-item">
                <Link to="/korisnik/letovi" className="navbar-link">Letovi</Link>
              </li>
              <li className="navbar-item">
                <button className="navbar-button" onClick={handleLogout}>Logout</button>
              </li>
            </>
          )
        ) : (
          <>
            <li className="navbar-item">
              <Link to="/login" className="navbar-link">Login</Link>
            </li>
            <li className="navbar-item">
              <Link to="/register" className="navbar-link">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
