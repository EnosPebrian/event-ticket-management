import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./style.css";
import { useNavigate } from "react-router-dom";
import api from "../json-server/api";
import uuid from "react-uuid";
import { useToast } from "@chakra-ui/react";
import NavbarLogin from "./navbarLogin";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useFormik } from "formik";

const Register = () => {
  const nav = useNavigate();
  const toast = useToast();
  YupPassword(Yup);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: 3,
      points: 0,
      is_verified: 0,
      referralcode: uuid(),
      reference: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().password().required(),
      confirmPassword: Yup.string().password().required(),
    }),
    onSubmit: async (values) => {
      if (values.confirmPassword == values.password) {
        const tmp = { ...values };
        tmp.email = tmp.email.toLowerCase();
        delete tmp.confirmPassword;
        toast({
          title: "processing",
          status: "info",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        await api
          .post("/users/new_account", tmp)
          .then((result) => {
            toast({
              title: "Your account has been created!",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
            nav("/login");
          })
          .catch((err) => {
            toast({
              title: "Failed to register",
              status: "error",
              description: err?.response?.data,
              duration: 3000,
              isClosable: true,
              position: "top",
            });
          });
      }
    },
  });

  return (
    <>
      <NavbarLogin />
      <center>
        <form>
          <div className="register-box" style={{ borderRadius: "50px" }}>
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
              <FloatingLabel label="Full Name" className="mb-1">
                <Form.Control
                  type="text"
                  placeholder="username"
                  name="username"
                  onChange={formik.handleChange}
                  style={{ borderRadius: "20px" }}
                />
                <span className="text-danger">{formik.errors.username}</span>
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInputemail"
                label="Email address"
                className="mb-1"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  name="email"
                  onChange={formik.handleChange}
                  style={{ borderRadius: "20px" }}
                />
                <span className="text-danger">{formik.errors.email}</span>
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  style={{ marginBottom: "5px", borderRadius: "20px" }}
                  name="password"
                  onChange={formik.handleChange}
                />
                <span className="text-danger">{formik.errors.password}</span>
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingconfirmPassword"
                label="Confirm Password"
              >
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  style={{ borderRadius: "20px" }}
                />
                <span className="text-danger">
                  {formik.values.password === formik.values.confirmPassword
                    ? null
                    : "Your password and confirmation password does not match"}
                </span>
              </FloatingLabel>
              <FloatingLabel controlId="reference" label="Referral code">
                <Form.Control
                  type="text"
                  placeholder="Referral code"
                  name="reference"
                  onChange={formik.handleChange}
                  style={{ borderRadius: "20px" }}
                />
              </FloatingLabel>
            </div>

            <Button
              variant="primary"
              size="lg"
              style={{ borderRadius: "20px" }}
              onClick={formik.handleSubmit}
            >
              Sign Up
            </Button>
          </div>
        </form>
      </center>
    </>
  );
};

export default Register;
