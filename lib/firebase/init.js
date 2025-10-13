import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDHtVIu_u5ajptuSM35O--FLtaLnF_ZJNg",
  authDomain: "the-balance-keepers.firebaseapp.com",
  databaseURL: "https://the-balance-keepers-default-rtdb.firebaseio.com",
  projectId: "the-balance-keepers",
  storageBucket: "the-balance-keepers.firebasestorage.app",
  messagingSenderId: "787639835671",
  appId: "1:787639835671:web:be220d07467a44e5875052",
  measurementId: "G-SJTHQGW8SN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export default app;