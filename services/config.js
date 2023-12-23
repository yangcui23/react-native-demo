import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, getDocs, collection } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCy7_C56EwUbKBTpGZqAcsHUusm8x7Bz4E",
  authDomain: "upandup-ddf5d.firebaseapp.com",
  projectId: "upandup-ddf5d",
  storageBucket: "upandup-ddf5d.appspot.com",
  messagingSenderId: "783894944919",
  appId: "1:783894944919:web:b5c2378912b79e2d9b5dd2",
  measurementId: "G-TSHTLZDB1R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

export { getFirestore, collection, getDocs };
