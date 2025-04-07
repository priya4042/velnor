import { initializeApp } from "firebase/app";
import { getFirestore, setLogLevel } from "firebase/firestore"; // 👈 added setLogLevel
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCkcTuzGBbmONSAYN2n_Dazp4wLrJbgx4s",
  authDomain: "velnor.firebaseapp.com",
  projectId: "velnor",
  storageBucket: "velnor.appspot.com",
  messagingSenderId: "355433941179",
  appId: "1:355433941179:web:ac9614d8f3cee56168c19e",
  measurementId: "G-XB887417P7"
};

setLogLevel("debug"); // 👈 logs Firestore details to the console

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
