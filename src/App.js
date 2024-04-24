import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// Import your components
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import ExerciseTracker from './components/ExcerciseTracker';
import DailyGoals from './components/DailyGoals';
import FoodTracker from './components/FoodTracker';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [auth]);

  return (
    <Router>
      <div className="app-container"> {/* Ensure this div wraps everything */}
        {currentUser && <NavBar />}

        <div className="main-content"> {/* Main content wrapper */}
          <ToastContainer />
          <Routes>
            <Route path="/login" element={currentUser ? <Navigate replace to="/" /> : <Login />} />
            <Route path="/" element={currentUser ? <Home /> : <Navigate replace to="/login" />} />
            <Route path="/about" element={currentUser ? <About /> : <Navigate replace to="/login" />} />
            <Route path="/contact" element={currentUser ? <Contact /> : <Navigate replace to="/login" />} />
            <Route path="/exercise-tracker" element={currentUser ? <ExerciseTracker /> : <Navigate replace to="/login" />} />
            <Route path="/daily-goals" element={currentUser ? <DailyGoals /> : <Navigate replace to="/login" />} />
            <Route path="/food-tracker" element={currentUser ? <FoodTracker /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate replace to={currentUser ? "/" : "/login"} />} />
          </Routes>
        </div>
        
        {currentUser && <Footer />} {/* Footer outside of the main content but inside the container */}
      </div>
    </Router>
  );
}

export default App;
