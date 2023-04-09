import React from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import { Form, Button } from "bootstrap-4-react";

const RestorePass = () => {
  const [email, setEmail] = React.useState("");
  const auth = getAuth();

  const handleClick = async (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    // <div>
    //   Enter your email and we will send you link
    //   <div className={styles.divv}>
    //     <form onSubmit={handleClick}>
    //       <input
    //         type="email"
    //         placeholder="Enter your email"
    //         value={input}
    //         onChange={(e) => setInput(e.target.value)}
    //       />
    //       <button>OK</button>
    //     </form>
    //     <button>
    //       <Link to="/">Return to main</Link>
    //     </button>
    //   </div>
    // </div>
    <div>
      <h1>Forgot Password Page!</h1>
      <Form onSubmit={handleClick} className="mb-2">
        <Form.Group>
          <label htmlFor="exampleInputEmail1">
            Enter your email and we will send you link. Do not forget to check
            also SPAM folder!
          </label>
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
        <Button primary type="submit">
          Submit
        </Button>
      </Form>
      <Link to="/">Return to main</Link>
    </div>
  );
};

export default RestorePass;
