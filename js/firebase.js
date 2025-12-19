
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCekRdRq0BsUCMRxUuyFOyoQ-_8Oqx1m4g",
    authDomain: "web-project-efe6a.firebaseapp.com",
    projectId: "web-project-efe6a",
    storageBucket: "web-project-efe6a.firebasestorage.app",
    messagingSenderId: "400440248230",
    appId: "1:400440248230:web:b70a1c97430d6b8bb33167",
    measurementId: "G-XXW6FP9HB6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);