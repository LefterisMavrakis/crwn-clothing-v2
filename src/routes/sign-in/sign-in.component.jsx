import {signInWithGooglePopup, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import Button from '../../components/button/button.component'
const SignIn = () => {
    const googleLogin = async () => {
        const {user} = await signInWithGooglePopup()
        await createUserDocumentFromAuth(user)
        console.log(user);
    }
    return (
        <div>
            <h1>Sign In</h1>
            <Button buttonType={'google'} onClick={googleLogin}>
                GOOGLE SIGN IN
            </Button>
            <SignUpForm />
        </div>
    )
}

export default SignIn