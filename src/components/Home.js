// import React, { useState, useEffect } from 'react';
// import { db } from '../firebase-config';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { Line } from 'react-chartjs-2';
// import './Home.css';
// import 'chart.js/auto';

// function Home() {
//   const [weeklyExerciseData, setWeeklyExerciseData] = useState({});
//   const auth = getAuth();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         const lastSevenDays = [...Array(7)].map((_, i) => {
//           const d = new Date();
//           d.setDate(d.getDate() - i);
//           return d.setHours(0, 0, 0, 0);
//         });

//         const weeklyData = {};

//         for (const dayTimestamp of lastSevenDays) {
//           const q = query(
//             collection(db, `users/${currentUser.uid}/exercises`),
//             where('date', '==', dayTimestamp),
//             where('completed', '==', true) // Fetch only completed exercises
//           );
//           const dailyExercises = await getDocs(q);
//           const totalDuration = dailyExercises.docs.reduce((total, doc) => total + Number(doc.data().duration), 0);
//           weeklyData[dayTimestamp] = totalDuration;
//         }
//         setWeeklyExerciseData(weeklyData);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const data = {
//     labels: Object.keys(weeklyExerciseData).map(dayTimestamp =>
//       new Date(Number(dayTimestamp)).toLocaleDateString()
//     ),
//     datasets: [
//       {
//         label: 'Total Exercise Time (minutes)',
//         data: Object.values(weeklyExerciseData),
//         fill: false,
//         borderColor: 'rgb(75, 192, 192)',
//         tension: 0.1
//       }
//     ]
//   };

//   return (
//     <div className="home">
//       <h1>Welcome to Health Mate</h1>
//       <p>Your personal health and fitness dashboard. Begin your journey towards a healthier lifestyle today!</p>
//       <div>
//         <h2>Your Weekly Exercise Trend</h2>
//         {Object.keys(weeklyExerciseData).length ? (
//           <Line data={data} />
//         ) : (
//           <p>Loading exercise data...</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Home;


// ... other imports
import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Line } from 'react-chartjs-2';
import './Home.css';
import 'chart.js/auto';

function Home() {
  const [weeklyExerciseData, setWeeklyExerciseData] = useState({});
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // This array represents the last 7 days in milliseconds
        const lastSevenDays = [...Array(7)].map((_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - i);
          return d.setHours(0, 0, 0, 0);
        });

        const weeklyData = {};
        for (const dayTimestamp of lastSevenDays) {
          const q = query(
            collection(db, `users/${currentUser.uid}/exercises`),
            where('date', '==', dayTimestamp),
            where('completed', '==', true) // Only fetch completed exercises
          );
          const dailyExercises = await getDocs(q);
          const totalDuration = dailyExercises.docs.reduce((total, doc) => total + Number(doc.data().duration), 0);
          weeklyData[dayTimestamp] = totalDuration;
        }

        setWeeklyExerciseData(weeklyData);
      }
    });

    return () => unsubscribe();
  }, []);

  const data = {
    labels: Object.keys(weeklyExerciseData).map(dayTimestamp =>
      new Date(Number(dayTimestamp)).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Total Exercise Time (minutes)',
        data: Object.values(weeklyExerciseData),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="home">
      <h1>Welcome to Health Mate</h1>
      <p>Your personal health and fitness dashboard. Begin your journey towards a healthier lifestyle today!</p>
      <div>
        <h2>Your Weekly Exercise Trend</h2>
        {Object.keys(weeklyExerciseData).length ? (
          <Line data={data} />
        ) : (
          <p>Loading exercise data...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
