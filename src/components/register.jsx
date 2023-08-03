import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./style.css";

const Register = () => {
  return (
    <>
      <center>
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
              <Form.Control type="text" placeholder="yourfullname" />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-1"
            >
              <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingPassword"
              label="Confirm Password"
            >
              <Form.Control type="password" placeholder="Confirm Password" />
            </FloatingLabel>
          </div>

          <Button variant="primary" size="lg">
            Sign Up
          </Button>
        </div>
      </center>
    </>
  );
};

export default Register;
