import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../json-server/api";

const Register = () => {
  const nav = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const register = (e) => {
    e.preventDefault();
    console.log("input Handler", user);
    api.post()
  };

  const inputHandler = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  useEffect(() => {
    inputHandler();
  }, []);

  return (
    <>
      <center>
        <form onSubmit={register}>
          <div className="register-box">
            <div className="judul">
              <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                Sign Up
              </span>
              <p>
                Already Have Fomophobia Account?
                <span>
                  <a href="login">login</a>
                </span>
              </p>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <FloatingLabel
                controlId="floatingInput"
                label="Full Name"
                className="mb-1"
              >
                <Form.Control
                  type="text"
                  placeholder="yourfullname"
                  required
                  onChange={(e) => inputHandler("username", e.target.value)}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-1"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  required
                  onChange={(e) => inputHandler("email", e.target.value)}
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => inputHandler("password", e.target.value)}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingPassword"
                label="Confirm Password"
              >
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  required
                  onChange={(e) =>
                    inputHandler("confirmPassword", e.target.value)
                  }
                />
              </FloatingLabel>
            </div>

            <Button variant="primary" size="lg" type="submit">
              Sign Up
            </Button>
          </div>
        </form>
      </center>
    </>
  );
};

export default Register;
