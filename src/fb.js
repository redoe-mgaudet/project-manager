import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCKFJSzJifiEPHqs0kY73Chl4B6Pin4WRY",
  authDomain: "project-manager-84a29.firebaseapp.com",
  databaseURL: "https://project-manager-84a29.firebaseio.com",
  projectId: "project-manager-84a29",
  storageBucket: "project-manager-84a29.appspot.com",
  messagingSenderId: "363442080261",
  appId: "1:363442080261:web:ea957f81bef2882d0baa6c",
  measurementId: "G-LBVGH98NKB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
