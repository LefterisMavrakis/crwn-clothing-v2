import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {displayName, email, password, confirmPassword  } = formFields

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(password !== confirmPassword || !email || !displayName || !password) {
            console.log("Error submiting the form")
            return
        }
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password)
            console.log("res", user)
            await createUserDocumentFromAuth(user, {displayName})
            resetFormFields()
            alert('User succefully created')

        } catch (err) {
            alert(err.message)
        }
        // createAuthUserWithEmailAndPassword(email, password).then(res => {
        //     console.log("res", res)
        // }).catch((err)=>{
        //     console.log("err", err.message)
        // })
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                <FormInput className='form-input' label='Display Name' type="text" required onChange={handleChange} name='displayName' value={displayName}/>
                <FormInput className='form-input' label='Email' type="email" required onChange={handleChange} name='email' value={email}/>
                <FormInput className='form-input' label='Password' type='password' required onChange={handleChange} name='password' value={password}/>
                <FormInput className='form-input' label='confirmPassword' type='password' required onChange={handleChange} name='confirmPassword' value={confirmPassword}/>
                <button type="submit">
                    Sign Up
                </button>
            </form>
        </div>

    )
}

export default SignUpForm;