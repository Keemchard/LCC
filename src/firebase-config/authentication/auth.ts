import { collection, addDoc, where, query, getDocs } from "firebase/firestore";
import { database, provider, auth } from "../firebase";

const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(provider);
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
  } catch (err: unknown | any) {
    alert(err.message);
  }
};

export default signInWithGoogle;
