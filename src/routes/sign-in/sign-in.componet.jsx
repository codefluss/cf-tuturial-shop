import { signInWidthGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';


const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWidthGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef);
    }
    
    return (
      <div>
          <h1>Sign In Page</h1>
          <button onClick={logGoogleUser}>
              Sign in with Google Popup
          </button>
      </div>  
    );
}

export default SignIn;