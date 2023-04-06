import firebase from "firebase/app";
import 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyDvFflP5DRuxb-mBkMxsYbTlrILRktq_KI",
    authDomain: "vueapp-4f2ff.firebaseapp.com",
    projectId: "vueapp-4f2ff",
    storageBucket: "vueapp-4f2ff.appspot.com",
    messagingSenderId: "293018414790",
    appId: "1:293018414790:web:52d7a5938a2d15484971c7",
    measurementId: "G-TM1BX02F2P"
  };
  

  firebase.initializeApp(firebaseConfig);
  
  export default firebase;