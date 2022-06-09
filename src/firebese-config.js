import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {

  apiKey: "AIzaSyDI36BeH14ajIFHrNrsVZ_3PylBdKZfoxw",

  authDomain: "react-http-aca73.firebaseapp.com",

  databaseURL: "https://react-http-aca73-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "react-http-aca73",

  storageBucket: "react-http-aca73.appspot.com",

  messagingSenderId: "23545611946",

  appId: "1:23545611946:web:75b0296627e999ef2172d3"

};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
