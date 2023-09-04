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
import { useFormik } from "formik";
import * as Yup from "yup";

export const Login = () => {
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [see, setSee] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      try {
        const res = await api.post("/users/auth", {
          ...values,
        });

        const user = res.data.user;
        localStorage.setItem("auth", res.data.token);

        dispatch({
          type: types.login,
          payload: user,
        });

        return nav("/home");
      } catch (err) {
        localStorage.removeItem("auth");
        return err.response.data;
      }
    },
  });

  useEffect(() => {
    const localData = localStorage.getItem("auth");
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
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-1"
            >
              <Form.Control
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                onChange={formik.handleChange}
                style={{ borderRadius: "20px" }}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                required
                onChange={formik.handleChange}
                style={{ borderRadius: "20px" }}
              />
            </FloatingLabel>
          </div>

          <Button variant="primary" size="lg" onClick={formik.handleSubmit}>
            Sign In
          </Button>
        </div>
      </center>
    </>
  );
};
