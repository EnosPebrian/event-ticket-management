import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import api from "../json-server/api";
import { useState } from "react";
function SingleEventDisplay({ search, events = [], setEvents, users }) {
  //get params id for querrying db
  const { event_id } = useParams();
  const [an_event, setAn_event] = useState({});
  const fetchThisEvent = async (an_event) => {
    const res = await api.get(`/events?id=${event_id}`);
    console.log(res);
    setAn_event(...res.data);
  };

  useState(() => {
    fetchThisEvent();
  });

  return (
    <Container style={{ padding: "10px" }}>
      <Card>
        <Card.Header as="h5">Featured</Card.Header>
        <Card.Img
          variant="top"
          referrerPolicy="no-referrer"
          src={an_event.photo}
          alt=""
          className="image-event"
        />
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SingleEventDisplay;
