import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div>
      <div>Sign Up</div>
      <div>
        <Link to="/">Already have an account?</Link>
      </div>
    </div>
  );
};

export default SignupPage;
