import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCgePgpe_IfuzRaol8UqLXPm72rQgOgHUE",
    authDomain: "codesashtra.firebaseapp.com",
    projectId: "codesashtra",
    storageBucket: "codesashtra.appspot.com",
    messagingSenderId: "735223924622",
    appId: "1:735223924622:web:f28feba09fa844b0e406df"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)