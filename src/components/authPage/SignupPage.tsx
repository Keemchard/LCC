import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { userRegistration } from "../../firebase-config/authentication/auth";

const SignupPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const createUser = (e: FormEvent) => {
    e.preventDefault();
    userRegistration(name, email, password);
  };

  return (
    <div>
      <div>Sign Up</div>
      <form onSubmit={createUser}>
        <input
          type="text"
          required
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          required
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          required
          placeholder="password"
          value={password}
          onChange={(e) => {
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
