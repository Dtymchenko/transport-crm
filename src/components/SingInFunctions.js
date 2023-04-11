import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/mainSlice";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { founderEmail } from "../data";

const SignInFunctions = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usersCollection = collection(db, "users");
  const newDocRef = doc(usersCollection);

  const handleEmailRegister = (email, password) => {
    let newData = {};
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        newData = {
          email,
          phone: "",
          id: user.uid,
          role: email === founderEmail ? "admin" : "user",
        };
        dispatch(
          setUser({
            email: user.email,
            phone: "",
            role: email === founderEmail ? "admin" : "user",
            id: user.uid,
            token: user.refreshToken,
          })
        );
        navigate("/");
      })
      .then(() => {
        setDoc(newDocRef, newData)
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      });
  };

  const handleGoogleRegister = async () => {
    try {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).then(async ({ user }) => {
        let newData = {
          email: user.email,
          phone: "",
          id: user.uid,
          role: "user",
        };
        dispatch(
          setUser({
            email: user.email,
            phone: "",
            id: user.uid,
            token: user.refreshToken,
            role: "user",
          })
        );
        navigate("/");
        const emailQuery = query(
          usersCollection,
          where("email", "==", user.email)
        );
        const emailSnapshot = await getDocs(emailQuery);
        if (emailSnapshot.docs.length === 0) {
          setDoc(newDocRef, newData)
            .then(() => {
              console.log("Document successfully written!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        }
      });
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  const handleFacebookRegister = async () => {
    try {
      const provider = new FacebookAuthProvider();
      signInWithPopup(auth, provider).then(async ({ user }) => {
        let newData = {
          email: user.email,
          phone: "",
          id: user.uid,
          role: "user",
        };
        dispatch(
          setUser({
            email: user.email,
            phone: "",
            id: user.uid,
            token: user.refreshToken,
            role: "user",
          })
        );
        navigate("/");
        const emailQuery = query(
          usersCollection,
          where("email", "==", user.email)
        );
        const emailSnapshot = await getDocs(emailQuery);
        if (emailSnapshot.docs.length === 0) {
          setDoc(newDocRef, newData)
            .then(() => {
              console.log("Document successfully written!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        }
      });
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  return { handleEmailRegister, handleGoogleRegister, handleFacebookRegister };
};
export default SignInFunctions;
