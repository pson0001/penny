import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_rDkLhh5VbUna2ZunoIIbI0MwSQAW7Ss",
  authDomain: "auth-dev-54c07.firebaseapp.com",
  databaseURL:
    "https://auth-dev-54c07-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "auth-dev-54c07",
  storageBucket: "auth-dev-54c07.appspot.com",
  messagingSenderId: "464977735690",
  appId: "1:464977735690:web:db571d99f7f0d41e8deff3",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };

// export const auth = getAuth(app);
export default app;
