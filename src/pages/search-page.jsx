import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import api from "../json-server/api";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

export const SearchPage = () => {
  const navigate = useNavigate();
  const { searchkey } = useParams();
  console.log(`search`, searchkey);
  const [filtered, setFiltered] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function fetchEvents() {
    const res = await api.get(`events?q=${searchkey}`);

    console.log(`search page`, res.data);
    setFiltered([...res.data]);
  }
  useEffect(() => {
    fetchEvents();
  }, [searchkey]);

  console.log(filtered);

  return (
    <>
      <Row>
        <Col lg={2} className="vh-100">
          <Button variant="primary" className="d-lg-none" onClick={handleShow}>
            Launch
          </Button>

          <Offcanvas
            show={show}
            onHide={handleClose}
            responsive="lg"
            className="bg-secondary p-2 vh-100"
            style={{ borderRadius: "15px" }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Responsive offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <p className="mb-0">
                This is content within an <code>.offcanvas-lg</code>.
              </p>
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
        <Col>
          <Container>
            <Row>
              {filtered[0] &&
                filtered.map((this_event, index) => (
                  <Col
                    md={6}
                    lg={4}
                    xl={3}
                    className="my-2 d-flex justify-content-center col-card"
                    key={index}
                    type="button"
                    onClick={() =>
                      navigate(`/${this_event.id}/${this_event.name}`)
                    }
                  >
                    <Card style={{ width: "18rem" }}>
                      <Card.Img
                        variant="top"
                        referrerPolicy="no-referrer"
                        src={this_event.photo[0]}
                        alt={this_event.name}
                        className="image-event"
                      />
                      <Card.Body>
                        <Card.Title className="event-name">
                          {this_event.name}
                        </Card.Title>
                        <Card.Text className="location">
                          {this_event.location}
                        </Card.Text>
                        <Card.Text className="date">
                          {this_event.date}
                        </Card.Text>
                        <Card.Text className="description">
                          {this_event.description}
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
};
