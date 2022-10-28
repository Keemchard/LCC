import { useState } from "react";
import { Link } from "react-router-dom";
import { userRegistrationLocal } from "../../firebase-config/authentication/auth";

const SignupPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div>
      <div>Sign Up</div>
      <form
        onSubmit={(e: any) => {
          userRegistrationLocal(name, email, password, e);
        }}
      >
        <input
          type="text"
          required
          placeholder="name"
          value={name}
          onChange={(e: any) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          required
          placeholder="email"
          value={email}
          onChange={(e: any) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          required
          placeholder="password"
          value={password}
          onChange={(e: any) => {
            setPassword(e.target.value);
          }}
        />
        <input type="submit" value="Create Acoount" />
      </form>
      <div>
        <Link to="/">Already have an account?</Link>
      </div>
    </div>
  );
};

export default SignupPage;
function userRegistration() {
  throw new Error("Function not implemented.");
}
