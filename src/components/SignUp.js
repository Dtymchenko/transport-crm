import { useDispatch } from "react-redux";
import FormRegAuth from "./FormRegAuth";
import { setUser } from "./redux/slices/mainSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { founderEmail } from "../data";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usersCollection = collection(db, "users");
  const newDocRef = doc(usersCollection);

  const handleRegister = (email, password) => {
    let newData = {};
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        newData = {
          email,
          id: user.uid,
          role: email === founderEmail ? "admin" : "user",
        };
        dispatch(
          setUser({
            email: user.email,
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

  return <FormRegAuth title="Register" handleClick={handleRegister} />;
};

export default SignUp;
