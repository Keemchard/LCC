import React, { FormEvent, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { collection, addDoc, where, query, getDocs } from "firebase/firestore";
import { database, provider, auth } from "../../firebase-config/firebase";
import ErrorContent from "../errorPage/ErrorContent";

const LoginPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  // const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  //timed error
  const timedError = (errorMsg: string) => {
    setErrorMessage(errorMsg);
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  };

  //MANUAL sign in
  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    try {
      setErrorMessage("");
      setLoading(true);
      const res = await auth.signInWithEmailAndPassword(email, password);
      const user: any = res.user;
      setName(user.email);
      setLoading(false);
      if (user.uid !== null) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    } catch (err: any) {
      setLoading(false);
      timedError(err.message);
    }
  };

  const manualSignIn = (e: FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  };

  //GOOGLE sign in
  const signInWithGoogle = async () => {
    try {
      setErrorMessage("");
      setLoading(true);
      const res = await auth.signInWithPopup(provider);
      const user: any = res.user;
      const userRef = collection(database, "users");
      const result = await getDocs(
        query(userRef, where("uid", "==", user.uid))
      );
      if (result.empty) {
        await addDoc(collection(database, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
      setName(user.displayName);
      setLoading(false);
      if (user.uid !== null) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    } catch (err: any | string) {
      setLoading(false);
      timedError(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (errorMessage !== "") {
  //   return <div>{}</div>;
  // }

  if (authenticated) {
    return <Navigate replace to={`/dashboard/${name}`} />;
  }

  return (
    <div>
      <h1>LoginPage</h1>
      <br />
      <form onSubmit={manualSignIn}>
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
      <br />
      <div>
        <div>or</div>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      </div>
      <br />
      <div>
        No Account? <Link to="/sign-in">Sign Up</Link>
      </div>
      <div>{errorMessage}</div>
    </div>
  );
};

export default LoginPage;
