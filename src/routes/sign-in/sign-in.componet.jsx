import {
    auth,
    signInWidthGooglePopup,
    createUserDocumentFromAuth,
    signInWidthGoogleRedirect
} from '../../utils/firebase/firebase.utils';
import { useEffect} from 'react';
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
    useEffect( () => {
        const response = getRedirectResult(auth);
        response.then(async userCredential => {
            if (userCredential) {
                const {user} = userCredential;
                createUserDocumentFromAuth(user);
            }
        });
    }, []);
    
    const logGoogleUser = async () => {
        const { user } = await signInWidthGooglePopup();
        await createUserDocumentFromAuth(user);
    }
    
    return (
      <div>
          <h1>Sign In Page</h1>
          <button onClick={logGoogleUser}>Sign in with Google Popup</button>
          <SignUpForm />
          { /* <button onClick={signInWidthGoogleRedirect}>Sign in with Google Redirect</button> */}
      </div>  
    );
}

export default SignIn;