// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "fir-auth-f99be.firebaseapp.com",
  projectId: "fir-auth-f99be",
  storageBucket: "fir-auth-f99be.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//connect for authentication
const auth = getAuth(app);
//initializeApp gives us an obj value, and we pass it into getAuth
//so we can make subs calls to diff. parts of the SDK. This is the app we're
//connected to
const db = getFirestore(app);
export { auth, db };