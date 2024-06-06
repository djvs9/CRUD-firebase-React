import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2lGGJE9remKA0hLTTCirky_57D5lhTO0",
  authDomain: "carritoej24pw-bc620.firebaseapp.com",
  projectId: "carritoej24pw-bc620",
  storageBucket: "carritoej24pw-bc620.appspot.com",
  messagingSenderId: "570026082189",
  appId: "1:570026082189:web:10b4786aa78655aab987c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

	//al final del código
	export const db = getFirestore(app);