import React, { useState } from 'react';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import './Login.css';
import { toast } from 'react-toastify';

// Import 'react-toastify/dist/ReactToastify.css' in your index.js or App.js

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSignup = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Account created successfully!');
      navigate('/'); // Redirect to the home page upon successful account creation
    } catch (error) {
      console.error('Error creating a new user', error);
      if (error.code === 'auth/weak-password') {
        toast.error('Password should be at least 6 characters long.');
      } else if (error.code === 'auth/email-already-in-use') {
        toast.error('Email already in use.');
      } else {
        toast.error('Failed to create account. Please try again.');
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully!');
      navigate('/'); // Redirect to the home page upon successful login
    } catch (error) {
      console.error('Error signing in with email and password', error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        toast.error('Invalid email or password.');
      } else {
        toast.error('Failed to sign in. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}

export default Login;
