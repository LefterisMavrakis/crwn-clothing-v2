import {signInWithGooglePopup, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
const SignIn = () => {
    const googleLogin = async () => {
        const {user} = await signInWithGooglePopup()
        const userDocRef = await createUserDocumentFromAuth(user)
        console.log(user);
    }
    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={googleLogin}>
                GOOGLE SIGN IN
            </button>
        </div>
    )
}

export default SignIn