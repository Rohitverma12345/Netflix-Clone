
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword ,getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection,  getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
   apiKey: "AIzaSyAZC-kgzOR2_EzkJEWG0ZPxZn3Q31KXZdo",
  authDomain: "netflix-clone-d37f2.firebaseapp.com",
  projectId: "netflix-clone-d37f2",
  storageBucket: "netflix-clone-d37f2.firebasestorage.app",
  messagingSenderId: "929589141503",
  appId: "1:929589141503:web:fc98197aae5fd3649391ca",
  measurementId: "G-3D3Z8TQ6SF"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);

        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch(error){
        console.log(error);
        // toast.error(error.code.split('/').split('-').join(" "));
         console.log(error.code, error.message);

        const message = error.code.includes('/')
        ? error.code.split('/')[1].replace(/-/g, ' ')
        : error.code;

        toast.error(message); 
    }
}


const login = async (email,password) => {
    try{
        await signInWithEmailAndPassword(auth, email, password);

    }
    catch(error){
        console.log(error);
        // toast.error(error.code.split('/').split('-').join(" "));
         console.log(error.code, error.message);

  
        const message = error.code.includes('/')
        ? error.code.split('/')[1].replace(/-/g, ' ')
        : error.code;

        toast.error(message); 
    }
}

const logout =()=>{
    signOut(auth);
}

export { auth, db, login, signup, logout};