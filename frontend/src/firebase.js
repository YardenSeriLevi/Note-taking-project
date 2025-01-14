
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, deleteDoc, onSnapshot, serverTimestamp, query, setDoc, updateDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzYGeq-xdBeIwyIN_7iMxWlpembMx8tTY",
    authDomain: "note-taking-a77ea.firebaseapp.com",
    projectId: "note-taking-a77ea",
    storageBucket: "note-taking-a77ea.appspot.com",
    messagingSenderId: "214621731805",
    appId: "1:214621731805:web:f17d1e538087defed15434"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export {
  firestore,
  auth,
  collection,
  addDoc,
  doc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  query,
  setDoc,
  updateDoc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};
