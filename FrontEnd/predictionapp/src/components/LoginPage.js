import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({onLogin}) {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    // Basic validation for both fields
    if (!credentials.email || !credentials.password) {
      alert('Please enter both email and password');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));

    // Check if user exists and credentials match
    if (user && user.email === credentials.email && user.password === credentials.password) {
      localStorage.setItem('isLoggedIn', 'true');  // Set login status in localStorage
      onLogin();  // Callback to handle post-login actions (if any)
      navigate('/home');  // Redirect to home page after successful login

    } else {
      alert('Invalid credentials, please try again');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
