import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const auth = getAuth(app);

export default db;
