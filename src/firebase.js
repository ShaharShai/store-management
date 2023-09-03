// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBS0TBl6aHOxb8xxEEq6efNX-YQvlnyl0Y",
  authDomain: "react-final-project-c671d.firebaseapp.com",
  projectId: "react-final-project-c671d",
  storageBucket: "react-final-project-c671d.appspot.com",
  messagingSenderId: "721555651293",
  appId: "1:721555651293:web:875f2b6896c54a000d7934"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);