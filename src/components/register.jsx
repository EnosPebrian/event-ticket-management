import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../json-server/api";
import uuid from "react-uuid";
import { useToast } from "@chakra-ui/react";
import NavbarLogin from "./navbarLogin";

const Register = () => {
  const nav = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    points: 0,
    referralcode: uuid(),
    reference: "",
    events: [],
  });
  const toast = useToast();

  const register = async (e) => {
    e.preventDefault();
    console.log("input Handler", user);

    const check = await api.get("/users", {
      params: {
        email: user.email,
      },
    });
    // console.log(check);

    if (check.data.length) {
      return toast({
        title: "Email sudah terdaftar",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
    if (user.confirmPassword == user.password) {
      const tmp = { ...user };
      delete tmp.confirmPassword;
      const res = await api.get(`users?referralcode=${tmp.reference}`);
      const ref = res.data[0];
      if (ref) {
        ref.points = ref.points + 20000;
        tmp.points = 20000;
        await api
          .patch(`users/${ref.id}`, ref)
          .then(() => delete tmp.reference);
      }

      await api.post("/users", tmp).then(() => {
        toast({
          title: "Berhasil Register!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        nav("/login");
      });
    } else {
      toast({
        title: "password & confirm password tidak sesuai!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const inputHandler = (key, value) => {
    setUser({ ...user, [key]: value });
    console.log(user);
  };

  useEffect(() => {
    const localData = localStorage.getItem("auth");
    if (localData) nav("/home");
    inputHandler();
  }, []);

  return (
    <>
      <NavbarLogin />
      <center>
        <form onSubmit={register}>
          <div className="register-box">
            <div className="judul-register">
              <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                Sign Up
              </span>
              <p style={{ fontWeight: "400", fontSize: "13px" }}>
                Already Have Fomophobia Account? &nbsp;
                <span>
                  <a href="login" style={{ color: "#2A3FB2" }}>
                    login
                  </a>
                  <hr />
                </span>
              </p>
            </div>
            {/* -------------------INPUT---------------------- */}
            <div style={{ marginBottom: "20px" }}>
              <FloatingLabel
                controlId="floatingInput"
                label="Full Name"
                className="mb-1"
              >
                <Form.Control
                  type="text"
                  placeholder="username"
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
                  style={{ marginBottom: "5px" }}
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
              <FloatingLabel controlId="reference" label="Referral code">
                <Form.Control
                  type="text"
                  placeholder="Referral code"
                  onChange={(e) => inputHandler("reference", e.target.value)}
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
