import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
import './ExerciseTracker.css';

function ExerciseTracker() {
  const [exercisePlan, setExercisePlan] = useState([{ name: '', duration: '' }]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleExerciseCountChange = (event) => {
    const value = event.target.value;
    const newCount = value === '' ? '' : Number(value);

    setExercisePlan((currentPlan) => {
        if (Number.isInteger(newCount) && newCount > 0) {
          return Array.from({ length: newCount }, (_, index) => (
            currentPlan[index] || { name: '', duration: '' }
          ));
        } else {
          return [];
        }
      });
    };
    
  
  const handleInputChange = (index, field, value) => {
    const newExercisePlan = [...exercisePlan];
    newExercisePlan[index][field] = value;
    setExercisePlan(newExercisePlan);
  };

  const handleSubmit = async event => { 
    event.preventDefault();

    if (!user) {
      toast.error('You must be logged in to save your exercise plan.');
      return;
    }

    for (const exercise of exercisePlan) {
      if (!exercise.name || !exercise.duration) {
        toast.error('All exercises must have a name and duration.');
        return;
      }
      if (isNaN(exercise.duration) || exercise.duration < 1) {
        toast.error('Duration must be a positive number.');
        return;
      }
    }

    try {
      const exercisesCollectionRef = collection(db, `users/${user.uid}/exercises`);
      for (const exercise of exercisePlan) {
        await addDoc(exercisesCollectionRef, {
          ...exercise,
          date: new Date().setHours(0, 0, 0, 0), // Set to today's date at midnight
          completed: false, // Initially, exercises are not completed
          timestamp: new Date(),
        });
      }
      toast.success('Exercise plan saved successfully!');
      // Optionally, you could clear the exercise plan or redirect the user here
    } catch (error) {
      console.error('Error saving exercise plan: ', error);
      toast.error('An error occurred while saving your exercise plan.');
    }
  };

  return (
    <div className="exercise-tracker">
      <h2>Exercise Tracker</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Number of Exercises:
          <input
            type="number"
            min="1"
            value={exercisePlan.length}
            onChange={handleExerciseCountChange}
          />
        </label>
        {exercisePlan.map((exercise, index) => (
          <div key={index} className="exercise-input-group">
            <input
              type="text"
              placeholder={`Exercise ${index + 1} Name`}
              value={exercise.name}
              onChange={e => handleInputChange(index, 'name', e.target.value)}
            />
            <input
              type="number"
              min="1"
              placeholder="Duration (minutes)"
              value={exercise.duration}
              onChange={e => handleInputChange(index, 'duration', e.target.value)}
            />
          </div>
        ))}
        <button type="submit" className="submit-plan-button">Save Exercise Plan</button>
      </form>
    </div>
  );
}

export default ExerciseTracker;
