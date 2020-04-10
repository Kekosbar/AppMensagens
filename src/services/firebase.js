import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAGfPRV9le8b3wrtBOtkS_U6SyvA1prz24",
    authDomain: "aprendizado-d09ee.firebaseapp.com",
    databaseURL: "https://aprendizado-d09ee.firebaseio.com",
    projectId: "aprendizado-d09ee",
    storageBucket: "aprendizado-d09ee.appspot.com",
    messagingSenderId: "856016907980",
    appId: "1:856016907980:web:8d2eeb14248855897d1c69",
    measurementId: "G-07EXSCQSX0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;