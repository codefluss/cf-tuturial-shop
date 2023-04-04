// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAavRnb6nn-KZMuteg0iMIrHA9p8BpDWiE",
    authDomain: "cf-crown-clothing-db.firebaseapp.com",
    projectId: "cf-crown-clothing-db",
    storageBucket: "cf-crown-clothing-db.appspot.com",
    messagingSenderId: "905179994752",
    appId: "1:905179994752:web:e7c47ba86b1afa7a172465"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const db = getFirestore();


export const signInWidthGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWidthGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    
    if (!(userSnapshot.exists())) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.error('error creating th user', error.message)
        }
    }
    return userDocRef;
}