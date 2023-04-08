import React from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/slices/mainSlice";
import { founderEmail } from "../data";

const Main = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUser());
  }, []);
  const email = useSelector((state) => state.user?.email);

  return (
    <>
      <div>
        Here is main page, where user comes just after login. If he is logged in
        with founder email - goes to admin part. If not - regular, he can create
        trips. If not logged in - redirects to login page.
      </div>
      {!email ? (
        <Navigate to="/login" />
      ) : email.toUpperCase() === founderEmail.toUpperCase() ? (
        <div>Admin</div>
      ) : (
        <div>Not Admin</div>
      )}
    </>
  );
};

export default Main;
