import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { ModalCreate } from "./modal-create";
import { useState } from "react";
import { useSelector } from "react-redux";

function HeaderNavbar({ events, setEvents, fetchEvents }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userSelector = useSelector((state) => state.auth);

  const nav = useNavigate();
  const inputHandler = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      document.getElementById("search-button").click();
    }
  };
  const searchButtonHandler = () => {
    nav(`/search/q?name=${document.getElementById("search-form").value}`);
  };

  function signIn() {
    nav("/login");
  }

  const logout = () => {
    localStorage.removeItem("auth");
    nav("/login");
  };

  const profile = () => {
    nav("/dashboardprofile");
  };

  console.log(userSelector.id);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary w-100" id="nav-container">
        <Container fluid id="top">
          <Navbar.Brand href="#">
            <span id="logo-text">FOMOPHOBIA</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link
                className="bg-primary"
                style={{ borderRadius: "10px" }}
                href={`/search/q?`}
              >
                Find Events
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                id="search-form"
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onKeyPress={(e) => inputHandler(e)}
              />
              <Button
                id="search-button"
                variant="outline-success"
                onClick={searchButtonHandler}
              >
                Search
              </Button>
            </Form>
            {userSelector?.id ? (
              <>
                <div
                  className="d-flex justify-content-center align-item-center ml-3 "
                  style={{ gap: "16px" }}
                >
                  <Button variant="outline-danger" onClick={logout}>
                    Logout
                  </Button>
                  <Button variant="outline-success" onClick={profile}>
                    Profile
                  </Button>
                </div>
              </>
            ) : (
              <Button
                variant="outline-success"
                style={{ marginLeft: "20px", width: "130px" }}
                onClick={signIn}
              >
                Sign In
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ModalCreate handleClose={handleClose} show={show} />
    </>
  );
}

export default HeaderNavbar;
