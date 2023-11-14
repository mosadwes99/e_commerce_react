import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtpsZgOaDS4YZv85cqJ98xCdg5fWUXMgY",
  authDomain: "crack-parser-391716.firebaseapp.com",
  projectId: "crack-parser-391716",
  storageBucket: "crack-parser-391716.appspot.com",
  messagingSenderId: "260512037789",
  appId: "1:260512037789:web:f5d36766d4b1cc97170d74",
  measurementId: "G-EEXDK1DS4P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
export { auth, db, storage }