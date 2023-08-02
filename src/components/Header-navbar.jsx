import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./style.css";

function HeaderNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" id="nav-container">
      <Container fluid>
        <Navbar.Brand href="#">
          <span id="logo-text">FOMOPHOBIA</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">About</Nav.Link>
            <NavDropdown title="Action" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">
                Create an Event
              </NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Manage Your Event
              </NavDropdown.Item>
              <NavDropdown.Item href="#action4">Contact sales</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Subscription</NavDropdown.Item>
            </NavDropdown>
            {/* <Nav.Link href="#" disabled>
              Link
            </Nav.Link> */}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Button variant="outline-success" style={{ marginLeft: "20px" }}>
            Sign In
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderNavbar;
