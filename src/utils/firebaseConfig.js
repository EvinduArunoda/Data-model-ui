import firebase from 'firebase';
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB6gXq_ZkgCC97eohciX9I8GvKt_ycBH34",
    authDomain: "data-model-db.firebaseapp.com",
    projectId: "data-model-db",
    storageBucket: "data-model-db.appspot.com",
    messagingSenderId: "484498595100",
    appId: "1:484498595100:web:e5c0b83a9a06c70ad6eed9",
    measurementId: "G-BDLWFV80RV"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;