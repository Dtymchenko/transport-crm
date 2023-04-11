import React from "react";
import { Form, Button } from "bootstrap-4-react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const CreateTrip = () => {
  const auth = getAuth();
  const user = auth?.currentUser;
  const email = user?.email;
  const uid = user?.uid;
  const phone = user?.phoneNumber;
  const usersCollection = collection(db, "users");
  const tripsCollection = collection(db, "trips");
  const newDocRef = doc(tripsCollection);

  const [role, setRole] = React.useState(localStorage.getItem("role"));
  const [tripFrom, setTripFrom] = React.useState("");
  const [tripTo, setTripTo] = React.useState("");
  const [passengers, setPassengers] = React.useState(0);
  const [carNumber, setCarNumber] = React.useState("");

  const getCurrentUser = () => {
    if (email || phone) {
      const usersQuery = query(
        usersCollection,
        where(email ? "email" : "phone", "==", email || phone)
      );
      getDocs(usersQuery).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setRole(data.role);
          localStorage.setItem("role", data.role);
        });
      });
    }
  };

  React.useEffect(() => {
    getCurrentUser();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newData = {
      creator: uid,
      carNumber,
      tripFrom,
      tripTo,
      passengers,
    };
    setDoc(newDocRef, newData)
      .then(() => {
        alert("Trip created successfully!");
        console.log("Document successfully written!");
      })
      .catch((error) => {
        alert(error);
        console.error("Error writing document: ", error);
      });
    setTripFrom("");
    setTripTo("");
    setPassengers(0);
    setCarNumber("");
  };

  return (
    <div>
      <h1 className="text-center">Create Trip as {role}</h1>
      <Form onSubmit={handleSubmit} className="mb-2">
        <Form.Group>
          <label htmlFor="exampleInputCarNumber">Car number</label>
          <Form.Input
            type="text"
            id="exampleInputCarNumber"
            placeholder="Enter car number"
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <label htmlFor="exampleInputFrom">Trip from</label>
          <Form.Input
            type="text"
            id="exampleInputFrom"
            placeholder="From"
            value={tripFrom}
            onChange={(e) => setTripFrom(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <label htmlFor="exampleInputTo">Trip to</label>
          <Form.Input
            type="text"
            id="exampleInputTo"
            placeholder="To"
            value={tripTo}
            onChange={(e) => setTripTo(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <label htmlFor="exampleInputPassengers">Quantity of passengers</label>
          <Form.Input
            type="number"
            id="exampleInputPassengers"
            placeholder="Quantity of passengers"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="d-flex">
          <Button primary type="submit" className="mx-auto">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default CreateTrip;
