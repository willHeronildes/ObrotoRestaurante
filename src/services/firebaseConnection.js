import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';



let firebaseConfig = {
    apiKey: "AIzaSyCEPfKTByWXqZ66HR9BE4yju52thFI7yfY",
    authDomain: "obroto-54d57.firebaseapp.com",
    projectId: "obroto-54d57",
    storageBucket: "obroto-54d57.appspot.com",
    messagingSenderId: "84536397154",
    appId: "1:84536397154:web:481eeb01db85fb0da8b03b",
    measurementId: "G-LW63CQTQXK"
  };
// verificando se não existe conexão aberta
  if(!firebase.apps.length){
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

  }
  
 export default firebase;