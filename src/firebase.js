import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB62ZOCtKTQ75Z96YpJB2HWDKVFCrvpqGQ",
    authDomain: "chatappreact-d471d.firebaseapp.com",
    projectId: "chatappreact-d471d",
    storageBucket: "chatappreact-d471d.appspot.com",
    messagingSenderId: "407682318253",
    appId: "1:407682318253:web:77e5ffeb8dc6398a1cab24"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
