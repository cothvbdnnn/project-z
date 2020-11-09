import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAFMrDjh84dSkuM2n-0s4sOZEc6ynjYNd8",
    authDomain: "project-z-68d96.firebaseapp.com",
    databaseURL: "https://project-z-68d96.firebaseio.com",
    projectId: "project-z-68d96",
    storageBucket: "project-z-68d96.appspot.com",
    messagingSenderId: "82629794599",
    appId: "1:82629794599:web:3c80cd46332a0310182702",
    measurementId: "G-BRBYR76CMN"
};

if (!firebase.apps.length) {
    const firebaseApp = firebase.initializeApp(firebaseConfig);
}

