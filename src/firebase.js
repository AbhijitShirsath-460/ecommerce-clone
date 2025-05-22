// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV7bQUBQpUtBaXZZeruhPUG4-7UtbxyXQ",
  authDomain: "ecommerce-clone-6e8ef.firebaseapp.com",
  projectId: "ecommerce-clone-6e8ef",
  storageBucket: "ecommerce-clone-6e8ef.firebasestorage.app",
  messagingSenderId: "523810430361",
  appId: "1:523810430361:web:daa5409a650c2eac1d8708"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };