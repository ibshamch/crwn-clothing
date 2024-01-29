import { useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithEmailAndPasswordFunc,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./signin.styles.scss";

const defaultformFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultformFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const resetFormFields = () => setFormFields(defaultformFields);

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInWithEmailAndPasswordFunc(email, password);
      console.log(response);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect Password for Email");
          break;
        case "auth/user-not-found":
          alert("User Not Found");
          break;
        default:
          console.log(error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h1>Sign In with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          onChange={handleChange}
          type="email"
          name="email"
          required
          value={email}
          label="Email"
        />
        <FormInput
          onChange={handleChange}
          type="password"
          required
          name="password"
          value={password}
          label="Password"
        />
        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button
            type="button"
            buttonType={"google"}
            onClick={signInWithGoogle}
          >
            Sign in With Google
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
