import { useDispatch } from "react-redux";
import FormRegAuth from "./FormRegAuth";
import { setUser } from "./redux/slices/mainSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import SignInNotEmail from "./SignInNotEmail";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        navigate("/");
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      });
  };

  return (
    <div className="max-width-500 mx-auto">
      <FormRegAuth title="Login" handleClick={handleLogin} />
      <SignInNotEmail />
    </div>
  );
};

export default Login;
