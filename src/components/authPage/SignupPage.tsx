import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { database, auth } from "../../firebase-config/firebase";
import ErrorContent from "../errorPage/ErrorContent";

const SignupPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const signUp = async (name: string, email: string, password: string) => {
    try {
      setErrorMessage("");
      setLoading(true);
      const res = await auth.createUserWithEmailAndPassword(email, password);
      const user: any = res.user;
      await addDoc(collection(database, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
      setLoading(false);
    } catch (err: any | string) {
      setLoading(false);
      console.log(err.message);
      setErrorMessage(err.message);
    }
  };

  const createUser = (e: FormEvent) => {
    e.preventDefault();
    signUp(name, email, password);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMessage !== "") {
    return (
      <div>
        <Link to="/">back to LOG-IN page</Link>
        <ErrorContent errorMsg={errorMessage} />
      </div>
    );
  }

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
