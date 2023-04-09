import React from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/slices/mainSlice";
import { founderEmail } from "../data";

const Main = () => {
  const dispatch = useDispatch();

  const email = useSelector((state) => state.main?.email);
  React.useEffect(() => {
    dispatch(getUser());
  }, [email]);

  return (
    <>
      <div>
        Here is main page, where user comes just after login. If he is logged in
        with founder email - goes to admin part. If not - regular, he can create
        trips. If not logged in - redirects to login page.
      </div>
      {!!email ? (
        email.toUpperCase() === founderEmail.toUpperCase() ? (
          <div className="text-center">Logged in as Admin</div>
        ) : (
          <div className="text-center">Logged in as not Admin</div>
        )
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Main;
