import React from "react";
import FormRegGoogleFacebook from "./FormRegGoogleFacebook";
import FormRegPhone from "./FormRegPhone";
import SignInFunctions from "./SingInFunctions";

const SignInNotEmail = () => {
  
  const { handleGoogleRegister, handleFacebookRegister } = SignInFunctions();
  return (
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
  );
};

export default SignInNotEmail;
