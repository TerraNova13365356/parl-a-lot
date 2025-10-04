import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "API KEY",
    authDomain: "AUTH DOMAIN",
    databaseURL: "DB URL",
    projectId: "code-box-ee11f",
    storageBucket: "STORAGE BUCKET",
    messagingSenderId: "MESSAGE ID",
    appId: "APP ID"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, get, set, onValue };

