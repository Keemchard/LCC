import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { database, auth } from "../../firebase-config/firebase";
import ErrorContent from "../errorPage/ErrorContent";

const SignupPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

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
      setName("");
      setEmail("");
      setPassword("");
      navigate("/");
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
    <div className="h-[100vh] bg-[gray] flex justify-center items-center">
      <div className="bg-[brown] w-[500px] p-[20px]">
        <div className="text-center text-[30px] mb-[20px]">Sign Up</div>
        <form onSubmit={createUser} className="flex flex-col">
          <input
            className="mb-[9px] p-[10px]"
            type="text"
            required
            placeholder="Enter Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            className="mb-[9px] p-[10px]"
            type="Email"
            required
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="mb-[9px] p-[10px]"
            type="Password"
            required
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            className="mt-[15px] p-[10px] bg-[lightgray]"
            type="submit"
            value="Create Acoount"
          />
        </form>
        <div className="mt-[20px] mb-[10px] hover:text-[green]">
          <Link to="/">Already have an account?</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
