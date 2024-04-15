// // DailyGoals.js

// import React, { useState, useEffect } from 'react';
// import { db } from '../firebase-config';
// import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
// import { toast } from 'react-toastify';
// import './DailyGoals.css';


// function DailyGoals() {

//   const [todaysExercises, setTodaysExercises] = useState([]);
//   const auth = getAuth();
//   const user = auth.currentUser;

//   useEffect(() => {
//     const fetchTodaysExercises = async () => {
//       if (user) {
//         const today = new Date();
//         today.setHours(0, 0, 0, 0);
//         const q = query(collection(db, `users/${user.uid}/exercises`), where('date', '==', today));
//         const querySnapshot = await getDocs(q);
//         const exercises = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setTodaysExercises(exercises);
//       }
//     };

//     fetchTodaysExercises();
//   }, [user]);

//   const toggleExerciseCompleted = async (exerciseId, isCompleted) => {
//     try {
//       const exerciseRef = doc(db, `users/${user.uid}/exercises`, exerciseId);
//       await updateDoc(exerciseRef, {
//         completed: !isCompleted,
//       });

//       // Update local state
//       setTodaysExercises(todaysExercises.map(ex => ex.id === exerciseId ? { ...ex, completed: !isCompleted } : ex));
//       toast.success('Exercise status updated!');
//     } catch (error) {
//       console.error('Error updating exercise: ', error);
//       toast.error('Could not update the exercise.');
//     }
//   };

//   // Calculate progress
//   const completedExercises = todaysExercises.filter(ex => ex.completed).length;
//   const totalExercises = todaysExercises.length;
//   const progressPercentage = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0;

//   return (
//     <div>
//       <h1>Daily Goals</h1>
//       <progress value={progressPercentage} max="100"></progress>
//       {todaysExercises.map((exercise) => (
//         <div key={exercise.id}>
//           <label>
//             <input
//               type="checkbox"
//               checked={exercise.completed}
//               onChange={() => toggleExerciseCompleted(exercise.id, exercise.completed)}
//             />
//             {exercise.name} - {exercise.duration} minutes
//           </label>
//         </div>
//       ))}
//       {/* Display progress */}
//     </div>
//   );
// }

// export default DailyGoals;


import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
import './DailyGoals.css';

function DailyGoals() {
  const [todaysExercises, setTodaysExercises] = useState([]);
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // This will trigger a re-render
    });
    return unsubscribe; // Cleanup on unmount
  }, []);

  useEffect(() => {
    const fetchTodaysExercises = async () => {
      if (user) {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to midnight to match the start of the day
        const q = query(
          collection(db, `users/${user.uid}/exercises`),
          where('date', '==', today.getTime()) // Ensure 'date' is stored as timestamp
        );
        const querySnapshot = await getDocs(q);
        const exercises = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodaysExercises(exercises);
      }
    };

    if (user) {
      fetchTodaysExercises();
    }
  }, [user]);

  const toggleExerciseCompleted = async (exerciseId, isCompleted) => {
    const exerciseRef = doc(db, `users/${user.uid}/exercises`, exerciseId);
    await updateDoc(exerciseRef, {
      completed: !isCompleted,
    });

    // Update local state
    setTodaysExercises(
      todaysExercises.map((ex) =>
        ex.id === exerciseId ? { ...ex, completed: !isCompleted } : ex
      )
    );

    toast.success('Exercise status updated!');
  };

  // Calculate progress
  const completedExercises = todaysExercises.filter((ex) => ex.completed).length;
  const totalExercises = todaysExercises.length;
  const progressPercentage = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0;

  return (
    <div className="daily-goals">
      <h1>Daily Goals</h1>
      <progress value={progressPercentage} max="100"></progress>
      {todaysExercises.map((exercise) => (
        <div key={exercise.id} className="exercise-item">
          <label>
            <input
              type="checkbox"
              checked={exercise.completed}
              onChange={() => toggleExerciseCompleted(exercise.id, exercise.completed)}
            />
            {exercise.name} - {exercise.duration} minutes
          </label>
        </div>
      ))}
    </div>
  );
}

export default DailyGoals;
