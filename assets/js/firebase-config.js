// ============================================================
//  firebase-config.js  —  SkyLens
//  Substitua os valores abaixo pelos do seu projeto Firebase.
//  Console: https://console.firebase.google.com
// ============================================================

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js';

// 🔴 SUBSTITUA pelos dados do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBLzgFtaKgpjbTrQkkIA7H4C7ZKOGEgxxE",
  authDomain: "skylens-398ee.firebaseapp.com",
  projectId: "skylens-398ee",
  storageBucket: "skylens-398ee.firebasestorage.app",
  messagingSenderId: "25890398174",
  appId: "1:25890398174:web:708d4f0827b67d7c48874f"
};
const app = initializeApp(firebaseConfig);

export const auth    = getAuth(app);
export const db      = getFirestore(app);
export const storage = getStorage(app);
