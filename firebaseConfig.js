// JavaScript/firebaseConfig.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBA62D8Sp2J0SEZh3PCeDu9DO6AfIBnH2M",
  authDomain: "dulcetentacion-59240.firebaseapp.com",
  projectId: "dulcetentacion-59240",
  storageBucket: "dulcetentacion-59240.firebasestorage.app",
  messagingSenderId: "138707269686",
  appId: "1:138707269686:web:54260b822b60959b98c097"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportamos la base de datos para usarla en otros JS
export const db = getFirestore(app);
