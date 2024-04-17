import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import './NavBar.css';

function NavBar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe; // Remember to unsubscribe on component unmount
  }, [auth]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after sign out
    } catch (error) {
      console.error('Error signing out: ', error);
      // Here, you might want to display an error message to the user
    }
  };

  return (
    <nav className="navbar">
      <Link className="nav-link" to="/">Home</Link>
      <Link className="nav-link" to="/about">About</Link>
      <Link className="nav-link" to="/contact">Contact</Link>
      {user && (
        <>
          <Link className="nav-link" to="/exercise-tracker">Exercise Tracker</Link>
          <Link className="nav-link" to="/daily-goals">Daily Goals</Link>
          <Link className="nav-link" to="/food-tracker">Food Tracker</Link>
          <button className="nav-link" onClick={handleSignOut}>Sign Out</button>
        </>
      )}
      {!user && (
        <Link className="nav-link" to="/login">Login</Link>
      )}
    </nav>
  );
}

export default NavBar;
