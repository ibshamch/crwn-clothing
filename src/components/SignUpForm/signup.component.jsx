import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import { Form } from "react-router-dom";

const defaultformFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultformFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const resetFormFields = () => setFormFields(defaultformFields);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already exists");
      }

      console.log(error);
    }
  };

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          onChange={handleChange}
          name="displayName"
          type="text"
          required
          value={displayName}
          label="Display Name"
        />
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
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
          type="password"
          value={confirmPassword}
          required
        />
        <button className="submit" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
