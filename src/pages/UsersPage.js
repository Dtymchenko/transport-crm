import React from "react";
import { founderEmail } from "../data";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUser } from "../components/redux/slices/mainSlice";

const UsersPage = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.main?.email);
  React.useEffect(() => {
    dispatch(getUser());
  }, [email]);
  return (
    <div>
      {email?.toUpperCase() === founderEmail.toUpperCase() ? (
        <div className="text-center">Users will be rendered here</div>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

export default UsersPage;
