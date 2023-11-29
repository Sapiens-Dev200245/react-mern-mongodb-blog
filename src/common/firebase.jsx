// Import the functions you need from the SDKs you need
import { initializeApp  } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup  ,getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnbXpZHPrBt0I9aQWIJnmvnJ5Gr0xfcgI",
  authDomain: "react-mern-mongodb.firebaseapp.com",
  projectId: "react-mern-mongodb",
  storageBucket: "react-mern-mongodb.appspot.com",
  messagingSenderId: "153539728121",
  appId: "1:153539728121:web:5b1d8c25f026e71b228828"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
    let user = null;
    await signInWithPopup(auth , provider).then((result) => {
        user = result.user
    }).catch((err) => {
        console.log(err)
    })
    return user;
}