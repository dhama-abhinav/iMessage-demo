import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAIwmnRgeBnojadV-Cotdxe8BnHoUOv_II",
  authDomain: "imessage-demo-62a41.firebaseapp.com",
  databaseURL: "https://imessage-demo-62a41.firebaseio.com",
  projectId: "imessage-demo-62a41",
  storageBucket: "imessage-demo-62a41.appspot.com",
  messagingSenderId: "919250205963",
  appId: "1:919250205963:web:151d78611d897a17e0360e",
  measurementId: "G-MSZ5QZ8YGW",
};

const firebaseApp= firebase.initializeApp(firebaseConfig)
const db= firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth , provider} 
export default db