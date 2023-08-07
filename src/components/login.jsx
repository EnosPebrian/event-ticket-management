import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./style.css";
import { useState } from "react";
import api from "../json-server/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const nav = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputHandler = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  const login = async () => {
    const auth = await axios.get("http://localhost:2000/users", {
      params: {
        email: user.email,
      },
    });
    console.log(auth);

    if (!auth.data) {
      return alert("email/password salah");
    } else {
      // delete auth.data[0].password;

      localStorage.setItem("auth", JSON.stringify(auth.data[0]));
      alert(`hello ${user.username}`);
      nav("/");
    }
  };
  return (
    <>
      <center>
        <div className="register-box">
          <div className="judul">
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>
              Sign In
            </span>
            <p>
              Don’t have yesplis account ?
              <span>
                <a href="register">Sign Up</a>
              </span>
            </p>
          </div>
          {/* INPUT */}
          <div style={{ marginBottom: "60px" }}>
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
              <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>
          </div>

          <Button variant="primary" size="lg" onClick={login}>
            Sign In
          </Button>
        </div>
      </center>
    </>
  );
};
