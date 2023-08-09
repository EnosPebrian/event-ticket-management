import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/hooks";
import { ModalCreate } from "./modal-create";
import { useState } from "react";
import { NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function HeaderNavbar({ events, setEvents, fetchEvents }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const nav = useNavigate();
  const inputHandler = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      document.getElementById("search-button").click();
    }
  };
  const searchButtonHandler = () => {
    nav(`/search/q=${document.getElementById("search-form").value}`);
  };

  function signIn() {
    nav("/login");
  }

  const logout = () => {
    localStorage.removeItem("auth");
    nav("/login");
  };

  const profile = () => {
    const user = JSON.parse(localStorage.getItem("auth"));
    console.log("ini button profile", user.username);
    if (user.username) nav(`/dashboardprofile/?${user.username}`);
  };

  const topup = () => {
    nav("/dashboardprofile/topup");
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary w-100" id="nav-container">
        <Container fluid>
          <Navbar.Brand href="#">
            <NavLink href="/home">
              <span id="logo-text">FOMOPHOBIA</span>
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link
                className="bg-primary"
                style={{ borderRadius: "10px" }}
                href={`/search/q=`}
              >
                Find Events
              </Nav.Link>
              <NavDropdown title="Action" id="navbarScrollingDropdown">
                <NavDropdown.Item>
                  <Button variant="primary" onClick={handleShow}>
                    Create new event
                  </Button>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Manage Your Event
                </NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Contact sales
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Subscription
                </NavDropdown.Item>
              </NavDropdown>
              {/* <Nav.Link href="#" disabled>
              Link
            </Nav.Link> */}
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
              <Button
                variant="outline-success"
                style={{ marginLeft: "20px", width: "130px" }}
                onClick={signIn}
              >
                Sign In
              </Button>
              <Button
                variant="outline-success"
                style={{ marginLeft: "20px" }}
                onClick={profile}
              >
                Profile
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ModalCreate handleClose={handleClose} show={show} />
    </>
  );
}

export default HeaderNavbar;
