import React, { useState } from "react";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { Form, Button } from "bootstrap-4-react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/mainSlice";
import {
  collection,
  doc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const FormRegPhone = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.main?.email);
  const userPhone = useSelector((state) => state.main?.phone);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const auth = getAuth();
  const usersCollection = collection(db, "users");
  const newDocRef = doc(usersCollection);
  const navigate = useNavigate();

  const generateReCaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {},
          "expired-callback": () => {},
        },
        auth
      );
    }
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleVerificationCodeChange = (event) => {
    setVerificationCode(event.target.value);
  };

  const handleSendCodeClick = (e) => {
    e.preventDefault();
    // const phoneNumberWithCountryCode = "+38" + phoneNumber;
    generateReCaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      });
  };

  const handleSignInClick = async (e) => {
    e.preventDefault();
    try {
      const confirmationResult = window.confirmationResult;
      confirmationResult.confirm(verificationCode).then(async (result) => {
        const user = result.user;
        let newData = {
          email: "",
          phone: user.reloadUserInfo.phoneNumber,
          id: user.uid,
          role: "user",
        };
        dispatch(
          setUser({
            email: "",
            phone: user.reloadUserInfo.phoneNumber,
            id: user.uid,
            token: user.refreshToken,
            role: "user",
          })
        );
        navigate("/");
        const emailQuery = query(
          usersCollection,
          where("phone", "==", user.reloadUserInfo.phoneNumber)
        );
        const emailSnapshot = await getDocs(emailQuery);
        if (emailSnapshot.docs.length === 0) {
          setDoc(newDocRef, newData)
            .then(() => {
              console.log("Document successfully written!");
            })
            .catch((error) => {
              alert(error);
              console.error("Error writing document: ", error);
            });
        }
      });
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-center">Or Use Phone Number</h2>
      <Form
        onSubmit={handleSendCodeClick}
        className="mb-2 d-flex justify-content-between"
      >
        <Form.Group className="flex-grow-1 mr-1 mb-0">
          <Form.Input
            type="tel"
            placeholder="Correct Format: +380505555555"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </Form.Group>
        <Button className="width-180" primary disabled={userEmail || userPhone}>
          Send Verification Code
        </Button>
      </Form>
      <Form
        onSubmit={handleSignInClick}
        className="mb-2 d-flex justify-content-between"
      >
        <Form.Group className="flex-grow-1 mr-1">
          <Form.Input
            type="tel"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={handleVerificationCodeChange}
          />
        </Form.Group>
        <Form.Group>
          <Button
            className="width-180"
            primary
            disabled={userEmail || userPhone}
          >
            Sign In
          </Button>
        </Form.Group>
      </Form>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default FormRegPhone;
