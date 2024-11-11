import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Register.css'; // Make sure to import the CSS file

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    employeeId: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    // Basic validation to ensure all fields are filled
    if (!user.name || !user.email || !user.employeeId || !user.password || !user.confirmPassword) {
      alert('Please fill out all fields');
      return;
    }

    if (user.password === user.confirmPassword) {
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userRegistered', 'true');

      // Redirect to login page
      navigate('/login');
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div className="register-container">
      <h2>Welcome to Our Platform!</h2>
      <div className="form">
        <input
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
          className="input-field"
        />
        <input
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          className="input-field"
        />
        <input
          name="employeeId"
          placeholder="Employee ID"
          value={user.employeeId}
          onChange={handleChange}
          className="input-field"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          className="input-field"
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={user.confirmPassword}
          onChange={handleChange}
          className="input-field"
        />
        <button onClick={handleRegister} className="register-btn">Register Now</button>
      </div>
    </div>
  );
}

export default Register;
