import React from "react";
import { useSelector } from "react-redux";

const FormRegGoogleFacebook = ({ title, handleClick, icon }) => {
  const userEmail = useSelector((state) => state.main?.email);
  const userPhone = useSelector((state) => state.main?.phone);

  return (
    <button
      className="cursor-pointer border border-dark mb-2 text-center d-inline"
      onClick={handleClick}
      disabled={userEmail || userPhone}
    >
      <img className="mr-2" src={icon} alt={title} width={30}></img>Sing In with{" "}
      {title}
    </button>
  );
};

export default FormRegGoogleFacebook;
