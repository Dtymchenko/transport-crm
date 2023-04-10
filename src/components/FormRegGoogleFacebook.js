import React from "react";

const FormRegGoogleFacebook = ({ title, handleClick, icon }) => {
  return (
    <button
      className="cursor-pointer border border-dark mb-2 text-center d-inline"
      onClick={handleClick}
    >
      <img className="mr-2" src={icon} alt={title} width={30}></img>Sing In
      with {title}
    </button>
  );
};

export default FormRegGoogleFacebook;
