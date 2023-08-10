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

function NavbarLogin({ events, setEvents, fetchEvents }) {
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
    nav("/dashboardprofile");
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary w-100" id="nav-container">
        <Container fluid>
          <Navbar.Brand href="home">
            <span id="logo-text">FOMOPHOBIA</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll"></Navbar.Collapse>
        </Container>
      </Navbar>
      <ModalCreate handleClose={handleClose} show={show} />
    </>
  );
}

export default NavbarLogin;
