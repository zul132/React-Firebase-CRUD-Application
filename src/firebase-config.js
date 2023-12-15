import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC9z5HAOoEk7_QxtdqrgLFCvIeXOLkEjk8",
    authDomain: "react-firebase-aa809.firebaseapp.com",
    projectId: "react-firebase-aa809",
    storageBucket: "react-firebase-aa809.appspot.com",
    messagingSenderId: "281394989837",
    appId: "1:281394989837:web:cf732c7d52b0f818e03e44",
    measurementId: "G-YT4QL6X56Q"
  };

  const app = initializeApp(firebaseConfig);
  
  export const db = getFirestore(app);