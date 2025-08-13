// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "fatima-connect",
  appId: "1:53263910860:web:2cdb9625a3806e25c07f69",
  storageBucket: "fatima-connect.firebasestorage.app",
  apiKey: "AIzaSyDBQgoRGSpb_Wdz33itzZolP8xV1QkGdww",
  authDomain: "fatima-connect.firebaseapp.com",
  messagingSenderId: "53263910860",
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

export { db };
