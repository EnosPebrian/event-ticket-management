import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
// import ExampleCarouselImage from "components/ExampleCarouselImage";

function Eventdisplay({ search, events, setEvents, users }) {
  const navigate = useNavigate();
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
          {events.map((event, index) => (
            <Col
              md={6}
              lg={3}
              className="my-2"
              key={index}
              type="button"
              onClick={() => navigate(`/${event.id}`)}
            >
              {console.log(`event`, event)}
              <img
                referrerPolicy="no-referrer"
                src={event.photo}
                width={"100%"}
                alt=""
                className="image-event"
              />
              <div className="event-name">{event.name}</div>
              <div className="location">{event.location}</div>
              <div className="date">{event.date}</div>
              <div className="description">{event.description}</div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Eventdisplay;
