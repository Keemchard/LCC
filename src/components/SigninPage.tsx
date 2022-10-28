import React from "react";
import signInWithGoogle from "../firebase-config/authentication/auth";

const SigninPage = () => {
  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with google</button>
    </div>
  );
};

export default SigninPage;
