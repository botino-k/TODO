// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCcAsLiGyOqqtln-XMmYFzG3aqnhOVm0LM',
  authDomain: 'react-todo-app-d1456.firebaseapp.com',
  projectId: 'react-todo-app-d1456',
  storageBucket: 'react-todo-app-d1456.appspot.com',
  messagingSenderId: '808765164797',
  appId: '1:808765164797:web:8b77256d8faa67605cc294',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service

export const db = getFirestore(app);
export const storage = getStorage(app);
