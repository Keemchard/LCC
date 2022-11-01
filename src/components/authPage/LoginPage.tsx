import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { collection, addDoc, where, query, getDocs } from "firebase/firestore";
import { database, provider, auth } from "../../firebase-config/firebase";
import ErrorContent from "../errorPage/ErrorContent";

const LoginPage = () => {
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const signInWithGoogle = async () => {
    try {
      setErrorMessage("");
      setLoading(true);
      const res = await auth.signInWithPopup(provider);
      console.log(res);
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
      console.log(err.message);
      setErrorMessage(err.message);
    }
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

  if (authenticated) {
    return <Navigate replace to={`/dashboard/${name}`} />;
  }

  return (
    <div>
      <h1>LoginPage</h1>
      <br />
      <div>
        <div>or</div>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      </div>
      <br />
      <div>
        No Account? <Link to="/sign-in">Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginPage;
