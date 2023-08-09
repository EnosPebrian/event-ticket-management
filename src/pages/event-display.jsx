import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import api from "../json-server/api";
import { useEffect, useState } from "react";
import "../components/style.css";
// import ExampleCarouselImage from "components/ExampleCarouselImage";

function Eventdisplay() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const fetchEvents = async () => {
    try {
      const res_events = await api.get("/events");
      setEvents([...res_events.data]);
      // console.log(events);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchEvents();
    fetchRating();
  }, []);

  const [rating_map, setRating_map] = useState({});
  const [rating_length, setRating_length] = useState({});
  async function fetchRating() {
    const res = await api.get("/reviews");
    const data = res.data;
    // console.log(`tass`, data);
    const temp_obj = new Object();
    const temp_total_reviews = {};
    let avg_rating;
    let total_reviews;
    data?.forEach((element) => {
      avg_rating =
        element.ratings.reduce((acc, currentVal) => acc + currentVal, 0) /
        element.ratings.length;
      total_reviews = element.ratings.length;
      temp_obj[element.id] = avg_rating;
      temp_total_reviews[element.id] = total_reviews;
      // console.log(temp_obj);
    });
    setRating_map(temp_obj);
    setRating_length(temp_total_reviews);
  }

  // console.log(`obj`, rating_map);

  return (
    <>
      <Container>
        <Carousel id="carousel-container">
          <Carousel.Item>
            <img
              src="https://api.yesplis.com/images/slider/8044935f5ad212cb8c3d74cb8d8fefdb158025d6.png.webp"
              referrerPolicy="no-referrer"
              className="img-carousel"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://api.yesplis.com/images/slider/3baeaeeb8b92bdc3e02940d91dd4b68a204b7d52.png.webp"
              referrerPolicy="no-referrer"
              className="img-carousel"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://api.yesplis.com/images/slider/521ccf964196249b8b09a63819dad8db5f0b4d5b.png.webp"
              referrerPolicy="no-referrer"
              className="img-carousel"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
      <Container className="mt-5">
        <Row>
          {events.map((ev, index) => (
            <Col
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={3}
              className="my-2 d-flex justify-content-center col-card"
              key={index}
              type="button"
              onClick={() => navigate(`/${ev.id}/${ev.name}`)}
            >
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  referrerPolicy="no-referrer"
                  src={ev.photo[0]}
                  alt={ev.name}
                  className="image-event"
                />
                <Card.Body>
                  <Card.Title className="event-name">{ev.name}</Card.Title>
                  <Card.Text className="location">{ev.location}</Card.Text>
                  <Card.Text className="date">{ev.date}</Card.Text>
                  <Card.Text className="description">
                    {ev.description}
                  </Card.Text>
                  <Card.Text className="rating">
                    <span>
                      <span
                        class="fa fa-star star-checked"
                        style={{ marginRight: "4px" }}
                      ></span>
                      <b>
                        {rating_map[ev.id] &&
                          Number(rating_map[ev.id]).toFixed(2)}
                      </b>
                      {rating_map[ev.id] && `/5 `}
                    </span>
                    <span>
                      {rating_length[ev.id]
                        ? `(${rating_length[ev.id]})`
                        : `No ratings`}
                    </span>
                  </Card.Text>
                  <Button variant="primary">Reserve Ticket</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Eventdisplay;
