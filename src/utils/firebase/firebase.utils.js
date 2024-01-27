import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// getDoc => get data, setDoc => set Data

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoftJtrhBZG6bX9CeI7fHF3ZJGlm5PzNU",
  authDomain: "crwn-clothing-db-d04d8.firebaseapp.com",
  projectId: "crwn-clothing-db-d04d8",
  storageBucket: "crwn-clothing-db-d04d8.appspot.com",
  messagingSenderId: "1080908112928",
  appId: "1:1080908112928:web:97954aa63467a0d8d84845",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "user", userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("Error Creating the user", error.message);
    }
  }

  return userDocRef;
};
