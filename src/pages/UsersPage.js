import React from "react";
import { founderEmail } from "../data";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUser } from "../components/redux/slices/mainSlice";
import { collection, QuerySnapshot, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import User from "../components/User";

const UsersPage = () => {
  const [users, setUsers] = React.useState([]);
  const dispatch = useDispatch();
  const email = useSelector((state) => state.main?.email);
  const usersCollection = collection(db, "users");
  React.useEffect(() => {
    dispatch(getUser());
  }, [email]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(usersCollection);
      const fetchedUsers = [];
      querySnapshot.forEach((doc) => {
        fetchedUsers.push(doc.data());
      });
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, []);

  return (
    <div className="d-flex justify-content-between flex-wrap gap-2 p-2">
      {email?.toUpperCase() === founderEmail.toUpperCase() ? (
        users?.map((user) => <User key={user.id} user={user} />)
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

export default UsersPage;
