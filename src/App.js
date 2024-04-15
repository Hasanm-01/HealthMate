// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer } from 'react-toastify';


// // Import your components
// import NavBar from './components/NavBar';
// import Footer from './components/Footer';
// import Home from './components/Home';
// import About from './components/About';
// import Contact from './components/Contact';
// import Login from './components/Login';
// import ExcerciseTracker from './components/ExcerciseTracker';
// import DailyGoals from './components/DailyGoals';

// function App() {
//   const [currentUser, setCurrentUser] = useState(null);
//   const auth = getAuth();

//   useEffect(() => {
//     // This function automatically unsubsribes when component unmounts
//     const unsubscribe = onAuthStateChanged(auth, user => {
//       setCurrentUser(user);
//     });    

//     return unsubscribe;
//   }, [auth]);

//   return (
//     <Router>
//       <>
//         <ToastContainer />
//         {/* Only show NavBar if the user is logged in */}
//         {currentUser && <NavBar />}
        
//         <Routes>
//         {/* Redirect to login page if not logged in */}
//        {/* Add more protected routes below */}
//        <Route path="/about" element={currentUser ? <About /> : <Navigate to="/login" />} />
//        <Route path="/contact" element={currentUser ? <Contact /> : <Navigate to="/login" />} />
  
//        {/* Your ExerciseTracker route */}
//        <Route path="/exercise-tracker" element={currentUser ? <ExcerciseTracker /> : <Navigate to="/login" />} />

//        {/* Add the DailyGoals route */}
//        <Route path="/daily-goals" element={currentUser ? <DailyGoals /> : <Navigate to="/login" />} />
       
//           {/* ... other routes ... */}
  
//        {/* Redirect any other route to Home or Login depending on the auth state */}
//        <Route path="*" element={currentUser ? <Home /> : <Navigate to="/login" />} />
//        </Routes>


//         {/* Only show Footer if the user is logged in */}
//         {currentUser && <Footer />}
//       </>
//     </Router>
//   );
// }

// export default App;


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

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });    

    return unsubscribe; // Cleanup subscription on unmount
  }, [auth]);

  return (
    <Router>
      <>
        <ToastContainer />
        {currentUser && <NavBar />}

        <Routes>
          <Route path="/login" element={currentUser ? <Navigate replace to="/" /> : <Login />} />
          <Route path="/" element={currentUser ? <Home /> : <Navigate replace to="/login" />} />
          <Route path="/about" element={currentUser ? <About /> : <Navigate replace to="/login" />} />
          <Route path="/contact" element={currentUser ? <Contact /> : <Navigate replace to="/login" />} />
          <Route path="/exercise-tracker" element={currentUser ? <ExerciseTracker /> : <Navigate replace to="/login" />} />
          <Route path="/daily-goals" element={currentUser ? <DailyGoals /> : <Navigate replace to="/login" />} />
          <Route path="*" element={<Navigate replace to={currentUser ? "/" : "/login"} />} />
        </Routes>

        {currentUser && <Footer />}
      </>
    </Router>
  );
}

export default App;
