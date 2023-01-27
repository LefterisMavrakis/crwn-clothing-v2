// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, 
        signInWithRedirect,
        signInWithPopup,
        GoogleAuthProvider,
        createUserWithEmailAndPassword
     } from "firebase/auth";
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc 
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiXSdiFlcqV4eo-WyZ7ssRtLZVD6i6NWs",
  authDomain: "crwn-clothing-db-fa8ad.firebaseapp.com",
  projectId: "crwn-clothing-db-fa8ad",
  storageBucket: "crwn-clothing-db-fa8ad.appspot.com",
  messagingSenderId: "222949770606",
  appId: "1:222949770606:web:c75ae7b53bbd8c04712d7f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(firebaseApp);
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)
    console.log('userDocRef', userDocRef);
    console.log('userSnapshot', userSnapshot);
    console.log('userSnapshot', userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation 
            })
        } catch(err) {
            console.log('error creating the user', err)

        }
    }
    return userDocRef

    // if user data exists
    // if not user data exists
    //return userDocRef
    
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}