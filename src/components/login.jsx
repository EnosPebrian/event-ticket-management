import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./style.css";
import { useState } from "react";
import api from "../json-server/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { types } from "../redux/types";
import { Container } from "react-bootstrap";

export const Login = () => {
  const userSelector = useSelector((state) => state.auth);
  console.log(`userselector di login`, userSelector);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  const login = async () => {
    const auth = await api.get("/users", {
      params: {
        email: user.email,
        password: user.password,
      },
    });
    console.log("auth.data", auth.data);

    if (!auth.data) return alert("email/password salah");

    delete auth.data[0].password;

    await dispatch({ payload: { ...auth.data[0] }, type: types.login });

    localStorage.setItem("auth", JSON.stringify(auth.data[0]));
    nav("/");
  };

  return (
    <>
      <center>
        <Container>
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
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => inputHandler("password", e.target.value)}
                />
              </FloatingLabel>
            </div>

            <Button variant="primary" size="lg" onClick={login}>
              Sign In
            </Button>
          </div>
        </Container>
      </center>
    </>
  );
};
