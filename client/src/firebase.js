// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_BASE_API,
  authDomain: "mern-estate-molak.firebaseapp.com",
  projectId: "mern-estate-molak",
  storageBucket: "mern-estate-molak.appspot.com",
  messagingSenderId: "876087120354",
  appId: "1:876087120354:web:a65802ac6ef1db12c929bb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);