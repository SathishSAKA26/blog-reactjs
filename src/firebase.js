import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDcdc5WRtClDYaT9dS4Y-l-42ypYbKv2SU",
  authDomain: "blogs-app-9dc57.firebaseapp.com",
  projectId: "blogs-app-9dc57",
  storageBucket: "blogs-app-9dc57.appspot.com",
  messagingSenderId: "1042720379809",
  appId: "1:1042720379809:web:6fd2a8e3823172b9f431e0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

export default auth;