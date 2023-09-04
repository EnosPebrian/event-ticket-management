import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./style.css";
import { useEffect, useState } from "react";
import api from "../json-server/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { types } from "../redux/types";
import NavbarLogin from "./navbarLogin";
import { useToast } from "@chakra-ui/react";

export const Login = () => {
  const userSelector = useSelector((state) => state.auth);
  console.log(`userselector di login`, userSelector);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [see, setSee] = useState(false);

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

    if (auth.data == 0) {
      return toast({
        title: "email/password salah",
        description: "harap periksa kembali email/password anda",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }

    // alert("berhasil login");
    //toast here
    toast({
      title: "Login Success",
      description: "you are entering the app now",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });

    await dispatch({ payload: { ...auth.data[0] }, type: types.login });

    localStorage.setItem("auth", JSON.stringify(auth.data[0]));
    delete auth.data[0].password;

    nav("/home");
  };

  useEffect(() => {
    const localData = localStorage.getItem("auth");
    console.log("localData", localData);

    // if (localData) nav("/home");
  }, []);

  return (
    <>
      <NavbarLogin />
      <center>
        <div className="register-box" style={{ borderRadius: "50px" }}>
          <div className="judul">
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>
              Sign In
            </span>

            <p style={{ fontWeight: "400", fontSize: "13px" }}>
              Don’t have fomophobia account ? &nbsp;
              <span>
                <a href="register" style={{ color: "#2A3FB2" }}>
                  Sign Up
                </a>
                <hr />
              </span>
            </p>
          </div>

          <div style={{ marginBottom: "60px" }}>
            {/* <FloatingLabel
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
            </FloatingLabel> */}

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
                style={{ borderRadius: "20px" }}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                required
                onChange={(e) => inputHandler("password", e.target.value)}
                style={{ borderRadius: "20px" }}
              />
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
