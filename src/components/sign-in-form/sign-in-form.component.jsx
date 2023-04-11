import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { useDispatch } from 'react-redux';
import { emailSignInStart, googleSignInStart } from '../../store/user/user.action';
import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value })
    };

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
        resetFormFields();
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password for email.');
                    break;
                case 'auth/user-not-found':
                    alert('User could not be found');
                    break;
                default:
                    console.error(error);
            }
        }
    }

    return (
        <div className={`sign-in-container`}>
            <h2>Already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" 
                           type="email" 
                           name="email" 
                           required 
                           onChange={handleChange} 
                           value={email} />

                <FormInput label="Password"
                           type="password"
                           name="password"
                           required 
                           onChange={handleChange}
                           value={password} />
                
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button buttonType="google" type="button"
                            onClick={signInWithGoogle}>
                        Google Sign in
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;