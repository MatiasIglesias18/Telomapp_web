// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4d4gy1nttvjvjkh-MuAVv6dWclIzOxWs",
  authDomain: "telomapp.firebaseapp.com",
  projectId: "telomapp",
  storageBucket: "telomapp.appspot.com",
  messagingSenderId: "756310522",
  appId: "1:756310522:web:b366fe0f0aa3e3f58bc443",
};

// Initialize Firebase
export const initFirebase = initializeApp(firebaseConfig);

export const db = getFirestore(initFirebase);
