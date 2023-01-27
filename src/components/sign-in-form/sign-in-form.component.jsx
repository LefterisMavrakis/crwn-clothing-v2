import { useState } from "react";
import {  createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { signInWithGooglePopup, signInWithCreds } from "../../utils/firebase/firebase.utils";
import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {email, password  } = formFields

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }
    const googleLogin = async () => {
        const {user} = await signInWithGooglePopup()
        await createUserDocumentFromAuth(user)
        console.log(user);
    }

    

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(!email || !password) { 
            console.log("Login Error ")
            return
        }
        try {
            const response = await signInWithCreds(email, password)
            console.log("res", response)
            resetFormFields()
            alert('User succefully logged in')
        } catch (err) {
            console.log("err", err)
            if(typeof err.message == 'undefined'){
                alert(err.message)
            }
        }
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    return (
        <div className="sign-up-form-container">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                <FormInput className='form-input' label='Email' type="email" required onChange={handleChange} name='email' value={email}/>
                <FormInput className='form-input' label='Password' type='password' required onChange={handleChange} name='password' value={password}/>
                <div className="buttons-container">
                    <Button type="submit">
                        SIGN IN
                    </Button>
                    <Button type="button" buttonType={'google'} onClick={googleLogin}>
                        GOOGLE SIGN IN
                    </Button>
                </div>
            </form>
        </div>

    )
}

export default SignInForm;