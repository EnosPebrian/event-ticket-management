import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import api from '../json-server/api';
import { useEffect, useState } from 'react';
import '../components/style.css';
import HeaderNavbar from '../components/Header-navbar';
import { EventCardOnSearchPage } from '../components/EventCardOnSearchPage';
import { useNavigate } from 'react-router-dom/dist';

function Eventdisplay() {
  const nav = useNavigate();
  const [recommendation, setRecommendation] = useState([]);
  const [mostPopular, setMostPopular] = useState([]);
  const [bestRating, setBestRating] = useState([]);
  const fetchRecommendation = async () => {
    await api
      .get('/events/q?is_sponsored=1')
      .then((result) => setRecommendation(result.data.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchMostPopular = async () => {
    await api
      .get('/events/q?order_by=MostPopular')
      .then((result) => setMostPopular(result.data.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchBestRating = async () => {
    console.log('executed');
    await api
      .get('/events/q?order_by=HighestRating')
      .then((result) => setBestRating(result.data.data))
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchRecommendation();
    fetchMostPopular();
    fetchBestRating();
  }, []);

  return (
    <>
      <HeaderNavbar />
      <Container>
        <Carousel id="carousel-container" className="mt-2">
          <Carousel.Item>
            <img
              src="https://api.yesplis.com/images/slider/8044935f5ad212cb8c3d74cb8d8fefdb158025d6.png.webp"
              referrerPolicy="no-referrer"
              className="img-carousel"
              alt=""
            />
            <Carousel.Caption>
              {/* <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://api.yesplis.com/images/slider/3baeaeeb8b92bdc3e02940d91dd4b68a204b7d52.png.webp"
              referrerPolicy="no-referrer"
              className="img-carousel"
              alt=""
            />
            <Carousel.Caption>
              {/* <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://www.adeogroup.co.uk/wp-content/uploads/2020/03/Advertise-Your-Events-Through-These-Techniques-Using-Paid-Search-and-Social-Ads-2-1-1.jpg"
              referrerPolicy="no-referrer"
              className="img-carousel"
              alt=""
            />
            <Carousel.Caption>
              {/* <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p> */}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
      <Container className="mt-5">
        <h2 className="pl-2">RECOMMENDATION</h2>
        <Card style={{ maxHeight: '650px' }}>
          <Row
            className="d-flex flex-row flex-nowrap"
            style={{ overflowX: 'scroll' }}
          >
            {recommendation.map((ev, index) => (
              <EventCardOnSearchPage
                this_event={ev}
                index={index}
                key={ev.id}
              />
            ))}
          </Row>
        </Card>
        <h2 className="pl-2 mt-3">MOST POPULAR</h2>
        <Card style={{ maxHeight: '650px' }}>
          <Row
            className="d-flex flex-row flex-nowrap"
            style={{ overflowX: 'scroll' }}
          >
            {mostPopular.map((ev, index) => (
              <EventCardOnSearchPage
                this_event={ev}
                index={index}
                key={ev.id}
              />
            ))}
          </Row>
        </Card>
        <h2 className="pl-2 mt-3">BEST RATING</h2>
        <Card style={{ maxHeight: '650px' }}>
          <Row
            className="d-flex flex-row flex-nowrap"
            style={{ overflowX: 'scroll' }}
          >
            {bestRating.map((ev, index) => (
              <EventCardOnSearchPage
                this_event={ev}
                index={index}
                key={ev.id}
              />
            ))}
          </Row>
        </Card>
      </Container>
    </>
  );
}

export default Eventdisplay;
