import { useDispatch } from "react-redux";
import FormRegAuth from "./FormRegAuth";
import FormRegGoogleFacebook from "./FormRegGoogleFacebook";
import { setUser } from "./redux/slices/mainSlice";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { founderEmail } from "../data";
import FormRegPhone from "./FormRegPhone";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usersCollection = collection(db, "users");
  const newDocRef = doc(usersCollection);
  const auth = getAuth();

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

  const handleGoogleRegister = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(({ user }) => {
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

  const handleFacebookRegister = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then(({ user }) => {
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
        setDoc(newDocRef, newData)
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
            alert("Error writing document: ", error);
          });
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      });
  };

  return (
    <div className="max-width-500 mx-auto">
      <FormRegAuth title="Register" handleClick={handleEmailRegister} />
      <div className="d-flex flex-column">
        <FormRegGoogleFacebook
          title="Facebook"
          handleClick={handleFacebookRegister}
          icon="/assets/facebook.png"
        />
        <FormRegGoogleFacebook
          title="Google"
          handleClick={handleGoogleRegister}
          icon="/assets/google.png"
        />
        <FormRegPhone />
      </div>
    </div>
  );
};

export default SignUp;
