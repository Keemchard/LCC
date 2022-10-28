// import firebase from "firebase/app"; this is the old one
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFUDIUHrVXgHO46qWnvY1whOl7slu0ejo",
  authDomain: "lcc-project-dee7e.firebaseapp.com",
  projectId: "lcc-project-dee7e",
  storageBucket: "lcc-project-dee7e.appspot.com",
  messagingSenderId: "767043009213",
  appId: "1:767043009213:web:0c249396eba26a8f6e95d4",
  measurementId: "G-TX4Y66XM9S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);
export const database = getFirestore();
export const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const auth = firebase.auth();

// export default firebase;
