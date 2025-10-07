// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Note: These values are safe to be public in client-side code
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBY7OXasPIraK5gN1ckof7EvoQpHSatRBM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ipay-25be9.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ipay-25be9",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ipay-25be9.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "955906082177",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:955906082177:web:8edc5c9ce545c19848d480"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
