// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJdGLkyLjAXJsQmPT8_yO5dWJ4bQ6Mhtg",
  authDomain: "ecommerse-utn.firebaseapp.com",
  projectId: "ecommerse-utn",
  storageBucket: "ecommerse-utn.firebasestorage.app",
  messagingSenderId: "767259909621",
  appId: "1:767259909621:web:99c58c3f60ac3d931854bc"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
// Exportaciones
const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

export default appFirebase; // Exportación por defecto
export { auth, db }; // Exportaciones nombradas