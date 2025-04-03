import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// import firebase from "firebase/compat/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDhd84w31xuljgjrxQzcnp2ke9jvkNGpc",
  authDomain: "marvel-heroes-c2e5d.firebaseapp.com",
  projectId: "marvel-heroes-c2e5d",
  storageBucket: "marvel-heroes-c2e5d.firebasestorage.app",
  messagingSenderId: "791022825836",
  appId: "1:791022825836:web:652f608ee98f7aa812c349"
};

// console.log("Firebase Config: ", firebaseConfig)
const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

export const db = getFirestore(app);