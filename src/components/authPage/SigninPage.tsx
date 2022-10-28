import React from "react";
import signInWithGoogle from "../../firebase-config/authentication/auth";

const SigninPage = () => {
  return <button onClick={signInWithGoogle}>Sign in with google</button>;
};

export default SigninPage;
