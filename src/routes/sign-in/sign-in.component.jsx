import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";

const Signin = () => {
  useEffect(() => {
    const fetchRedirectResult = async () => {
      const res = await getRedirectResult(auth);
      if (res) {
        const userDocRef = await createUserDocumentFromAuth(res.user);
      }
    };
    fetchRedirectResult();
  }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign in with Google</button>
      <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button>
    </div>
  );
};

export default Signin;
