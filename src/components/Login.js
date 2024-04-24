

import React, { useState } from 'react';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { sendPasswordResetEmail } from "firebase/auth";
import './Login.css';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Account created successfully!');
      navigate('/'); // Redirect to the home page upon successful account creation
    } catch (error) {
      console.error('Error creating a new user', error);
      // Handle errors here
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully!');
      navigate('/'); // Redirect to the home page upon successful login
    } catch (error) {
      console.error('Error signing in with email and password', error);
      // Handle errors here
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (error) {
      console.error("Error sending password reset email", error);
      toast.error("Failed to send password reset email. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group action-buttons">
          <button type="submit" className="login-button">Login</button>
          <button type="button" onClick={handleForgotPassword} className="forgot-password-button">Forgot Password</button>
        </div>
        <div className="form-group">
          <button type="button" onClick={handleSignup} className="signup-button">Sign Up</button>
        </div>
      </form>
    </div>
  );
  
}

export default Login;