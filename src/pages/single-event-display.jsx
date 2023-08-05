import { Carousel, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import api from "../json-server/api";
import { useEffect, useState } from "react";
import SpinnerLoading from "../components/SpinnerLoading";
import FetchReviews from "../components/Fetchreviews";
function SingleEventDisplay({ search, events = [], setEvents, users }) {
  //get params id for querrying db
  const { eventid, eventname } = useParams();
  const [an_event, setAn_event] = useState([]);
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
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Container>
      <Container>
        <Card>
          <Card.Header as="h5">Comments and Review</Card.Header>
          <Card.Body>
            <FetchReviews />
          </Card.Body>
        </Card>
      </Container>
    </>
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
