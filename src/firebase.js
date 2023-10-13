// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import * as firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwrubWMjhxWyCsh199tV5xwp39FuVjzwU",
  authDomain: "nwitter-48427.firebaseapp.com",
  projectId: "nwitter-48427",
  storageBucket: "nwitter-48427.appspot.com",
  messagingSenderId: "14479173981",
  appId: "1:14479173981:web:1e7189d3a5dbf19d3ee0b4"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
export default firebase.initializeApp(firebaseConfig);