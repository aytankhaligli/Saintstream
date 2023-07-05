// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6awMYmMp6c0QVfJR-A0sNEX0Pbl_Ehnk",
  authDomain: "saintstream.firebaseapp.com",
  databaseURL: "https://saintstream-default-rtdb.firebaseio.com",
  projectId: "saintstream",
  storageBucket: "saintstream.appspot.com",
  messagingSenderId: "805826379803",
  appId: "1:805826379803:web:113be586d9c109420738be",
  measurementId: "G-8KRK6RG23X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
