import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
} from "firebase/auth";

import { getStorage, ref, uploadBytes, list } from "firebase/storage";

import { auth, storage } from "./firebaseConfig";

const UserContext = createContext();

//  this is wrapped around our components in the _app.jsx file
export const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const signup = async (email, pass) => {
    return await createUserWithEmailAndPassword(auth, email, pass);
  };
  const signin = async (email, pass) => {
    return await signInWithEmailAndPassword(auth, email, pass);
  };
  const signout = async () => {
    return await signOut(auth);
  };
  const sendEmailVer = async (currentUser) => {
    if (currentUser && !currentUser.emailVerified) {
      return await sendEmailVerification(currentUser);
    } else throw { error: "No User" };
  };
  const upload = async (files) => {
    await Object.values(files).forEach(async (file) => {
      const fileRef = ref(storage, `tournaments/tourney1/${file.name}`);
      try {
        await uploadBytes(fileRef, file);
      } catch (e) {
        alert(e);
      }
    });
  };
  const listTourneys = async () => {
    const listRef = ref(storage, `tournaments/tourney1`);
    try {
      const firstPage = await list(listRef, { maxResults: 10 });
      alert(JSON.stringify(firstPage.items));
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(JSON.stringify(currentUser));
    });
    return () => {
      console.log("unsubbing");
      unsub();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        signup,
        signin,
        signout,
        sendEmailVer,
        upload,
        listTourneys,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
