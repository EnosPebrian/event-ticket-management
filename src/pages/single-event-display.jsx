import { Carousel, Col, Container, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import api from "../json-server/api";
import { useEffect, useState } from "react";
import SpinnerLoading from "../components/SpinnerLoading";
import FetchReviews from "../components/Fetchreviews";
import FetchDiscussion from "../components/Fetchdiscussion";
import "../components/style.css";

function SingleEventDisplay() {
  //get params id for querrying db
  const { eventid, eventname } = useParams();
  const [an_event, setAn_event] = useState([]);
  const [users_map, setUsers_map] = useState(new Map());
  const [events_map, setEvents_map] = useState(new Map());
  const userId = JSON.parse(localStorage.getItem("auth")).id;

  const fetchEventsMap = async () => {
    try {
      const res_events = await api.get("/events");
      const temp_events_map = new Map();
      res_events.data.map((an_event) =>
        temp_events_map.set(an_event.id, an_event)
      );
      setEvents_map(temp_events_map);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsersMap = async () => {
    try {
      const res_users = await api.get("/users");
      const temp_users_map = new Map();
      res_users.data.map((user) => temp_users_map.set(user.id, user));
      setUsers_map(temp_users_map);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchThisEvent = async () => {
    try {
      const res = await api.get(`/events/${eventid}`);
      const temp = { ...res.data };
      setAn_event(temp);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEventsMap();
    fetchUsersMap();
    fetchThisEvent();
  }, []);

  return (
    <>
      <Container style={{ padding: "10px" }}>
        <Card>
          <Card.Header as="h5">{an_event.name}</Card.Header>
          <Carousel>
            {an_event.photo ? (
              an_event.photo.map((photo, idx) => (
                <Carousel.Item key={idx}>
                  <Card.Img
                    variant="top"
                    referrerPolicy="no-referrer"
                    src={photo}
                    alt={an_event.name}
                  />
                </Carousel.Item>
              ))
            ) : (
              <SpinnerLoading />
            )}
          </Carousel>

          <Card.Body>
            <Card.Title>{an_event.name}</Card.Title>
            <Card.Text>{an_event.description}</Card.Text>
            <Button variant="primary">Add ticket to Cart</Button>
          </Card.Body>
        </Card>
      </Container>
      <Container>
        <Row>
          <Col lg={6} md={12}>
            <Card>
              <Card.Header as="h5">Comments and Review</Card.Header>
              <Card.Body>
                <FetchReviews
                  users_map={users_map}
                  events_map={events_map}
                  eventid={eventid}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} md={12}>
            <Card>
              <Card.Header as="h5">
                Ask anything about the event below
              </Card.Header>
              <FetchDiscussion
                users_map={users_map}
                events_map={events_map}
                eventid={eventid}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SingleEventDisplay;
