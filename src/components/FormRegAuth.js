import React from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "bootstrap-4-react";

const FormRegAuth = ({ title, handleClick }) => {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");

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
          <Button primary type="submit" className="mx-auto">
            Submit
          </Button>
        </Form.Group>
      </Form>
      <div className="d-flex flex-column align-items-center">
        <p>
          Forgot password?{" "}
          <button>
            <Link to="/forgotpass">Click here</Link>
          </button>
        </p>
        {window.location.pathname === "/login" ? (
          <p>
            Do not have an account yet?{" "}
            <button>
              <Link to="/signup">Register</Link>
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <button>
              <Link to="/login">Sign in</Link>
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default FormRegAuth;
