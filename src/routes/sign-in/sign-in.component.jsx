import {signInWithGooglePopup, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
const SignIn = () => {
    const googleLogin = async () => {
        const {user} = await signInWithGooglePopup()
        await createUserDocumentFromAuth(user)
        console.log(user);
    }
    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={googleLogin}>
                GOOGLE SIGN IN
            </button>
            <SignUpForm />
        </div>
    )
}

export default SignIn