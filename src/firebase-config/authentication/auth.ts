import { collection, addDoc, where, query, getDocs } from "firebase/firestore";
import { database, provider, auth } from "../firebase";

export const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(provider);
    console.log(res);
    const user: any = res.user;
    const userRef = collection(database, "users");
    const result = await getDocs(query(userRef, where("uid", "==", user.uid)));
    if (result.empty) {
      await addDoc(collection(database, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err: any) {
    alert(err.message);
  }
};

export const userRegistration = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user: any = res.user;
    await addDoc(collection(database, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    alert(`"${name}" account created`);
  } catch (err: any) {
    alert(err.message);
  }
};

export const signInWithEmailAndPassword = async ({ email, password }: any) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err: any) {
    alert(err.message);
  }
};
