import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('andjela@example.com');
  const [password, setPassword] = useState('password');
  let navigate= useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password
      });
      const { access_token, user } = response.data;
      sessionStorage.setItem('token', access_token);
      sessionStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      if (user.role === 'admin') {
        navigate('/letovi');
      } else {
        navigate('/mojeKarte');
      }
      console.log('Login successful:', response.data);

    } catch (error) {
      alert("Login failed. Check your email and password and try again")
      console.error('There was an error logging in:', error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
