import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/storage";

// Firebase Configuration

const firebaseConfig = {
  apiKey: "AIzaSyDPrREFfVLV8DD74yGP96FPLXJnwpV50bw",
  authDomain: "quizapp-5d90a.firebaseapp.com",
  projectId: "quizapp-5d90a",
  storageBucket: "quizapp-5d90a.appspot.com",
  messagingSenderId: "1066378566423",
  appId: "1:1066378566423:web:07d37ac0c72e257432b552",
  measurementId: "G-CG1J5SG8RZ",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const app = firebase.initializeApp(firebaseConfig);

export { firebase };
