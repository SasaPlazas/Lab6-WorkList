// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJuhW14VQV0xoe61KSQqJwbGYsKj3AiuI",
  authDomain: "lista-de-tareas-22e8a.firebaseapp.com",
  projectId: "lista-de-tareas-22e8a",
  storageBucket: "lista-de-tareas-22e8a.firebasestorage.app",
  messagingSenderId: "253850743711",
  appId: "1:253850743711:web:a52c980fca39ffefa7c3aa",
  measurementId: "G-GY93R0Z2QE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);