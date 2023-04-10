import FormRegAuth from "./FormRegAuth";
import SignInNotEmail from "./SignInNotEmail";
import SignInFunctions from "./SingInFunctions";

const SignUp = () => {
  const { handleEmailRegister } = SignInFunctions();

  return (
    <div className="max-width-500 mx-auto">
      <FormRegAuth title="Register" handleClick={handleEmailRegister} />
      <SignInNotEmail />
    </div>
  );
};

export default SignUp;
