import React from "react";
import { Link } from "react-router-dom";
import { signInWithGoogle } from "../../firebase-config/authentication/auth";

const LoginPage = () => {
  return (
    <div>
      LoginPage
      <div>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      </div>
      <div>
        No Account? <Link to="/sign-in">Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginPage;
