// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWidthGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(`snapshot exists: ${userSnapshot.exists()}`);
    
    if (!(userSnapshot.exists())) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.error('error creating th user', error.message)
        }
    }
    return userDocRef;
}