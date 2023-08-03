import { Carousel, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import api from "../json-server/api";
import { useEffect, useState } from "react";
function SingleEventDisplay({ search, events = [], setEvents, users }) {
  //get params id for querrying db
  const { eventid, eventname } = useParams();
  // console.log(`eventid`, eventid);
  const [an_event, setAn_event] = useState([]);
  const fetchThisEvent = async () => {
    try {
      const res = await api.get(`/events/${eventid}`);
      const temp = { ...res.data };
      setAn_event(temp);
      console.log(`res.data`, res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchThisEvent();
  }, []);

  if (!an_event.photo) fetchThisEvent();
  console.log(`here`, an_event.photo);
  return (
    <Container style={{ padding: "10px" }}>
      <Card>
        <Card.Header as="h5">Featured</Card.Header>
        <Carousel>
          {an_event.photo &&
            an_event.photo.map((photo, idx) => (
              <Carousel.Item key={idx}>
                <Card.Img
                  variant="top"
                  referrerPolicy="no-referrer"
                  src={photo}
                  alt={an_event.name}
                />
              </Carousel.Item>
            ))}
        </Carousel>

        <Card.Body>
          <Card.Title>{an_event.name}</Card.Title>
          <Card.Text>{an_event.description}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SingleEventDisplay;

function PhotoMapper({ an_event }) {
  console.log(an_event);
  return an_event.map((photo, idx) => (
    <Carousel.Item key={idx}>
      <Card.Img
        variant="top"
        referrerPolicy="no-referrer"
        src={photo}
        alt={an_event.name}
      />
    </Carousel.Item>
  ));
}
