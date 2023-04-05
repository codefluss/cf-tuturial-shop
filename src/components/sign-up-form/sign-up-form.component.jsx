import { useState } from 'react';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';

import './sign-up-form.styles.scss';
import Button from '../button/button.component';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields; 

    
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value })
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            console.error('passwords does not match');
            return;
        } 
        
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user. Email already in use.')
            } else {
                console.error(error);
            }
        }
    }
    
    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name"
                           type="text" 
                           name="displayName" 
                           required 
                           onChange={handleChange} 
                           value={displayName} />

                <FormInput label="Email" 
                           type="email" 
                           name="email"
                           required 
                           onChange={handleChange} 
                           value={email} />

                <FormInput label="Password"
                           type="password" 
                           name="password" 
                           required onChange={handleChange} 
                           value={password} />

                <FormInput label="Confirm Password"
                           type="password"
                           name="confirmPassword" 
                           required 
                           onChange={handleChange} 
                           value={confirmPassword} />

                <Button type="submit">SIGN IN</Button>
            </form>
        </div>
    )
}

export default SignUpForm;