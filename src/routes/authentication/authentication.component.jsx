import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/SignUpForm/signup.component";
import SignInForm from "../../components/sign-in-form/signin.component";
import "./authentication.styles.scss";
const Authentication = () => {
  // For Google Redirect
  // useEffect(() => {
  //   const fetchRedirectResult = async () => {
  //     const res = await getRedirectResult(auth);
  //     if (res) {
  //       const userDocRef = await createUserDocumentFromAuth(res.user);
  //     }
  //   };
  //   fetchRedirectResult();
  // }, []);

  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
