import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div>
      LoginPage
      <div>
        No Account? <Link to="/sign-in">Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginPage;
