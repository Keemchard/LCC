import React, { FormEvent, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { collection, addDoc, where, query, getDocs } from "firebase/firestore";
import { database, provider, auth } from "../../firebase-config/firebase";
import Loading from "../loadings/Loading";
import { Alert } from "@mui/material";
import { getAuth } from "firebase/auth";

const LoginPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  // const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  //TODO create a localStorage to store auth (refresh issue)

  //timed error
  const timedError = (errorMsg: string) => {
    setErrorMessage(errorMsg);
    setTimeout(() => {
      setErrorMessage("");
    }, 8500);
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
    return <Loading />;
  }

  if (authenticated) {
    return <Navigate replace to={`/dashboard/${name}`} />;
  }

  return (
    <div className="h-[100vh] bg-[gray] p-[20px] flex flex-col items-center justify-center">
      <div className="mb-[50px]  text-[20px] font-semibold">
        <Link to="/dashboard/guest">Enter as Guest/Visitor</Link>
      </div>
      <div className="bg-[white] h-[auto] w-[350px] p-[10px] pt-[20px] pb-[40px] text-center">
        <h1 className="text-[30px] mb-[20px] font-bold">LoginPage</h1>
        <form
          onSubmit={manualSignIn}
          className="bg-[gray] flex flex-col p-[10px]"
        >
          <input
            className="mb-[9px] p-[10px]"
            type="Email"
            required
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="mb-[9px] p-[10px]"
            type="Password"
            required
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            className="mt-[15px] p-[10px] bg-[lightgray]"
            type="submit"
            value="Log In"
          />
        </form>
        <p className="m-[20px]">- or -</p>
        <div>
          <button
            className="mt-[15px] p-[10px] bg-[lightgray]"
            onClick={signInWithGoogle}
          >
            Sign in with Google
          </button>
        </div>
        <div className="m-[10px]  hover:text-[green] ">
          <Link to="/sign-up">Sign Up</Link>
        </div>

        {/* {errorMessage !== "" && (
          <Snackbar open={true} autoHideDuration={6000}>
            <Alert severity="error" sx={{ width: "100%" }}>
              {errorMessage}
            </Alert>
          </Snackbar>
        )} */}

        {errorMessage !== "" && <Alert severity="error">{errorMessage}</Alert>}

        {/* <div className="text-[red]">{errorMessage}</div> */}
      </div>
    </div>
  );
};

export default LoginPage;
