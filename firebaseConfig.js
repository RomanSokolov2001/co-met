import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyB0LaSO2KnD9_4IYnNz3jgoUh8JPnN9Nv0",
  authDomain: "coworker-99122.firebaseapp.com",
  projectId: "coworker-99122",
  storageBucket: "coworker-99122.appspot.com",
  messagingSenderId: "746655015301",
  appId: "1:746655015301:web:348ec3121ef373b5f064ec",
  measurementId: "G-QF2ZPVSXDF"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage, auth };