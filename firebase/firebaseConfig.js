// export const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

import { initializeApp } from "@firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { getStorage, ref, uploadBytes, list } from "firebase/storage";

import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();

export function signup(email, pass) {
  return createUserWithEmailAndPassword(auth, email, pass);
}

export function signin(email, pass) {
  return signInWithEmailAndPassword(auth, email, pass);
}

export function signout() {
  return signOut(auth);
}

// Custom hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}

export async function upload(files) {
  // alert(JSON.stringify(files));
  await Object.values(files).forEach(async (file) => {
    const fileRef = ref(storage, `tournaments/tourney1/${file.name}`);
    try {
      await uploadBytes(fileRef, file);
      alert("File uploaded");
    } catch (e) {
      alert(e);
    }
  });
}

export async function listTourneys() {
  const listRef = ref(storage, `tournaments/tourney1`);
  try {
    const firstPage = await list(listRef, { maxResults: 10 });
    alert(JSON.stringify(firstPage.items));
  } catch (e) {
    alert(e);
  }
}
