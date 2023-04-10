import React, { useState } from "react";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { Form, Button } from "bootstrap-4-react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/mainSlice";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const FormRegPhone = () => {
  const dispatch = useDispatch();
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
        console.error(error);
      });
  };

  const handleSignInClick = (e) => {
    e.preventDefault();
    const confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(verificationCode)
      .then((result) => {
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
        setDoc(newDocRef, newData)
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
            alert("Error writing document: ", error);
          });
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
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
        <Button
          className="width-180"
          primary
          // onClick={handleSendCodeClick}
        >
          Send Verification Code
        </Button>
        {/* </Form.Group> */}
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
            // onClick={handleSignInClick}
          >
            Sign In
          </Button>
        </Form.Group>
      </Form>
      {/* <label htmlFor="phone-number">Phone Number:</label>
      <input
        id="phone-number"
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
      />
      <button onClick={handleSendCodeClick}>Send Verification Code</button> */}
      {/* <label htmlFor="verification-code">Verification Code:</label>
      <input
        id="verification-code"
        type="tel"
        value={verificationCode}
        onChange={handleVerificationCodeChange}
      />
      <button onClick={handleSignInClick}>Sign In</button> */}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default FormRegPhone;
