import React from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  updateDoc,
  getDocs,
} from "firebase/firestore";

const User = ({ user }) => {
  const usersCollection = collection(db, "users");
  const handleRoleChange = (event) => {
    const newRole = event.target.value;
    const usersQuery = query(
      usersCollection,
      where(user.email ? "email" : "phone", "==", user.email || user.phone)
    );
    const usersSnapshot = getDocs(usersQuery);
    usersSnapshot.then((snapshot) => {
      const userDoc = snapshot.docs[0];
      updateDoc(userDoc.ref, { role: newRole });
    });
  };

  return (
    <div className="d-flex flex-column align-items-center border border-primary flex-grow-0 flex-shrink-0 flex-basis-30 flex-container-item">
      <div>Email: {user.email}</div>
      <div>Phone: {user.phone}</div>
      <div>
        <span className="mr-2">Role:</span>
        <select
          className="mb-2"
          defaultValue={user.role}
          onChange={handleRoleChange}
        >
          <option value="user">User</option>
          <option value="driver">Driver</option>
          <option value="passenger">Passenger</option>
          <option value="dispatcher">Dispatcher</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </div>
  );
};

export default User;
