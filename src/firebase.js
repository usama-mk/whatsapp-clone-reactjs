import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDcEwW6bHS_TbC1Zeh9HLMHGW5W8F2hkog",
    authDomain: "whatsapp-reactjs-clone.firebaseapp.com",
    databaseURL: "https://whatsapp-reactjs-clone.firebaseio.com",
    projectId: "whatsapp-reactjs-clone",
    storageBucket: "whatsapp-reactjs-clone.appspot.com",
    messagingSenderId: "468296930705",
    appId: "1:468296930705:web:58b4a3d8203730c9773630",
    measurementId: "G-W77QRFPKFE"
  };
// initialize the app with firebasaae config
const firebaseApp = firebase.initializeApp(firebaseConfig);

// db access the firestore instance of our firebase configured instance/ (app)
//basically it's a database
const db = firebaseApp.firestore(); 
const auth= firebase.auth();
const provider= new firebase.auth.GoogleAuthProvider(); // for google auth

export {auth, provider};
export default db;