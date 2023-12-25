//ios - 222146403064-djp922jqvm8g2ghkusi3is9jj69vg8ef.apps.googleusercontent.com
// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMwN0NknaPibHnpv8laiFYUKmQFz1FHZY",
  authDomain: "fir-beautyme.firebaseapp.com",
  projectId: "fir-beautyme",
  storageBucket: "fir-beautyme.appspot.com",
  messagingSenderId: "222146403064",
  appId: "1:222146403064:web:4076aff7b692b0e1b4f90d",
  measurementId: "G-D3PRHTJWXT"
};

// Initialize Firebase
let app;
if(firebase.apps.length==0){
    app=firebase.initializeApp(firebaseConfig);
}
else{
    app=firebase.app()
}
const auth=firebase.auth();

export {auth};