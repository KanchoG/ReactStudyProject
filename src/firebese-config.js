import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA1Ekd_ZDuwdRndmqB1swk3AIaBoKP0OUg",

  authDomain: "react-project-eb6b7.firebaseapp.com",

  projectId: "react-project-eb6b7",

  storageBucket: "react-project-eb6b7.appspot.com",

  messagingSenderId: "536031748177",

  appId: "1:536031748177:web:7291d032c12b836d975870",

  measurementId: "G-RGTV1GL2H6"

};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
