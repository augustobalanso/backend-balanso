import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: `${process.env.FIREBASE_PROJECT}.firebaseapp.com`,
    projectId: `${process.env.FIREBASE_PROJECT}`,
    storageBucket: `${process.env.FIREBASE_PROJECT}.appspot.com`,
    messagingSenderId: "190068860799",
    appId: "1:190068860799:web:921c087333623892b0dc4a"
 };

const firebaseApp = initializeApp(firebaseConfig);
const firebaseDb = getFirestore(firebaseApp)

export default firebaseDb