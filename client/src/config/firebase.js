import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB01W9SoJltRKHTsH42sXzsIzE5VOCsFeA",
  authDomain: "client-projects-d2888.firebaseapp.com",
  projectId: "client-projects-d2888",
  storageBucket: "client-projects-d2888.appspot.com",
  messagingSenderId: "825537140637",
  appId: "1:825537140637:web:010dbaf7512e33eadc4174"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();