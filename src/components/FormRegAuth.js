import React from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "bootstrap-4-react";
import { useSelector } from "react-redux";

const FormRegAuth = ({ title, handleClick }) => {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const userEmail = useSelector((state) => state.main?.email);
  const userPhone = useSelector((state) => state.main?.phone);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick(email, pass);
  };

  return (
    <div>
      <h1 className="text-center">{title}</h1>
      <Form onSubmit={handleSubmit} className="mb-2">
        <Form.Group>
          <label htmlFor="exampleInputEmail1">Email address</label>
          <Form.Input
            type="email"
            id="exampleInputEmail1"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text text="muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <label htmlFor="exampleInputPassword1">Password</label>
          <Form.Input
            type="password"
            id="exampleInputPassword1"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="d-flex">
          <Button
            primary
            type="submit"
            disabled={userEmail || userPhone}
            className="mx-auto"
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
      <div className="d-flex flex-column align-items-center">
        <p>
          Forgot password?{" "}
          <Link to="/forgotpass">
            <Button primary>Click here</Button>
          </Link>
        </p>
        {window.location.pathname === "/login" ? (
          <p>
            Do not have an account yet?{" "}
            <Link to="/signup">
              <Button primary>Register</Button>
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link to="/login">
              <Button primary>Sign in</Button>
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default FormRegAuth;
