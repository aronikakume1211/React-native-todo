import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSD5apUeqPrutzy-ZXxB6NSHTh9rVoT5c",
  authDomain: "test-2687e.firebaseapp.com",
  projectId: "test-2687e",
  storageBucket: "test-2687e.appspot.com",
  messagingSenderId: "476739493439",
  appId: "1:476739493439:web:dde2d12a921d91113d628a",
  measurementId: "G-KMVT7X7P2N"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);