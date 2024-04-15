import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyASJHlLXhly6_Vx5FjUaLmqDaa-pwtYs3U",
    authDomain: "healthmate-a70b0.firebaseapp.com",
    projectId: "healthmate-a70b0",
    storageBucket: "healthmate-a70b0.appspot.com",
    messagingSenderId: "72171373596",
    appId: "1:72171373596:web:dc029b9be6660c0c5b4bd9",
    measurementId: "G-T8BZVTJD19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
