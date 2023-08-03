import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./style.css";

export const Login = () => {
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

          <div style={{ marginBottom: "60px" }}>
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
          </div>

          <Button variant="primary" size="lg">
            Sign In
          </Button>
        </div>
      </center>
    </>
  );
};
