import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDfJ0bs9TQSmeUJbYlawRxd1Xtr36NwJEg",
  authDomain: "netflix-clone-8583c.firebaseapp.com",
  projectId: "netflix-clone-8583c",
  storageBucket: "netflix-clone-8583c.appspot.com",
  messagingSenderId: "572272578244",
  appId: "1:572272578244:web:84846ac6a7a8f24c024391"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email, 
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try {
       await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};