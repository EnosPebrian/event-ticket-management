import { Carousel, Col, Container, Form, Modal, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import api from "../json-server/api";
import { useEffect, useState } from "react";
import SpinnerLoading from "../components/SpinnerLoading";
import FetchReviews from "../components/Fetchreviews";
import FetchDiscussion from "../components/Fetchdiscussion";
import "../components/style.css";
import { SVGcalendar, SVGclock, SVGlocation } from "../components/SVG";
import { ModalBuy } from "../components/modal-buy";
import HeaderNavbar from "../components/Header-navbar";
import { ModalBuyPresale } from "../components/modal-buyPresale";
import uuid from "react-uuid";

function SingleEventDisplay() {
  //get params id for querrying db
  const { eventid, eventname } = useParams();
  const [an_event, setAn_event] = useState([]);
  const [users_map, setUsers_map] = useState(new Map());
  const [events_map, setEvents_map] = useState(new Map());
  try {
    const userId = JSON.parse(localStorage.getItem("auth")).id;
  } catch (err) {
    console.log(err);
  }

  console.log(events_map);
  const thisevent = events_map.get(eventid);

  const [modalShowVIP, setModalShowVIP] = useState(false);
  const [modalShowPresale, setModalShowPresale] = useState(false);

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
      if (isNaN(avg_rating)) {
        avg_rating = "";
      }
      temp_obj[element.id] = avg_rating;
      temp_total_reviews[element.id] = total_reviews;
      // console.log(temp_obj);
    });
    setRating_map(temp_obj);
    setRating_length(temp_total_reviews);
  }

  const buyFreeTicket = async () => {
    try {
      const res = await api.get(`/events/${eventid}`);
      //push ticket ke db
      if (res.data.isfree == 1) {
        const userSelectorLocal = JSON.parse(localStorage.getItem("auth"));
        const pushTicket = await api.post("/tickets", {
          userid: userSelectorLocal.id,
          eventid: eventid,
          ticketCode: uuid(),
          ticketCategory: "FREE",
        });
      } else alert("event ini tidak gratis");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEventsMap();
    fetchUsersMap();
    fetchThisEvent();
    fetchRating();
  }, []);

  return (
    <>
      <HeaderNavbar />
      <Container>
        <Row>
          <Col md={12} lg={9}>
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
                <Card.Text>
                  <span>
                    <span
                      class="fa fa-star star-checked"
                      style={{ marginRight: "4px" }}
                    ></span>
                    <b>
                      {rating_map[eventid] &&
                        Number(rating_map[eventid]).toFixed(2)}
                    </b>
                    {rating_map[eventid] && `/5 `}
                  </span>
                  <span>
                    {rating_length[eventid]
                      ? `(${rating_length[eventid]} rating)`
                      : `No ratings`}
                  </span>
                </Card.Text>
                <Card.Text>{an_event.description}</Card.Text>
                <Card.Text>
                  <span
                    className="d-flex align-items-center"
                    style={{ gap: "5px" }}
                  >
                    <span>
                      <SVGcalendar />
                    </span>
                    <span>{an_event["date-start"]}</span>
                    <span>
                      {an_event["date-end"]
                        ? `- ${an_event["date-end"]}`
                        : null}
                    </span>
                  </span>
                </Card.Text>
                <Card.Text>
                  <span
                    className="d-flex align-items-center"
                    style={{ gap: "5px" }}
                  >
                    <span>
                      <SVGclock />
                    </span>
                    <span>{an_event["time-start"]}</span>
                    <span>
                      {an_event["time-end"]
                        ? `- ${an_event["time-end"]}`
                        : null}
                    </span>
                  </span>
                </Card.Text>
                <Card.Text>
                  <span
                    className="d-flex align-items-center"
                    style={{ gap: "5px" }}
                  >
                    <span>
                      <SVGlocation />
                    </span>
                    <span>{an_event["location"]},</span>
                    <span>{an_event["venue"]}</span>
                  </span>
                </Card.Text>
                <Button
                  variant="primary"
                  href="#Ticket-card"
                  onClick={buyFreeTicket}
                >
                  Add ticket to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col id="Ticket-card">
            <Card>
              <Card.Header as="h5">Ticket Category</Card.Header>
              <Card.Body>
                {an_event?.isfree ? (
                  <>
                    <img
                      src="https://media.istockphoto.com/id/807772812/photo/free-price-tag-label.jpg?s=612x612&w=0&k=20&c=1Dq0FHOKP2UbhglZajMe5In_48U8k4qrI1Y4l_h9NrY="
                      alt="free"
                    />
                  </>
                ) : (
                  <>
                    {" "}
                    {an_event["vip-ticket-price"] ? (
                      <>
                        <Card.Title>VIP TICKET</Card.Title>
                        <Card.Text>
                          Rp
                          {Number(an_event["vip-ticket-price"]).toLocaleString(
                            `id-ID`
                          )}
                          ,00
                        </Card.Text>
                        <Card.Text>
                          Stock: {an_event["vip-ticket-stock"]}
                        </Card.Text>
                        <Button
                          className="mb-3"
                          onClick={() => setModalShowVIP(true)}
                        >
                          Buy VIP ticket
                        </Button>
                        <ModalBuy
                          show={modalShowVIP}
                          onHide={() => setModalShowVIP(false)}
                          eventid={eventid}
                          events_map={events_map}
                          fetchThisEvent={fetchThisEvent}
                        />
                      </>
                    ) : null}
                    {an_event["presale-ticket-price"] ? (
                      <>
                        <Card.Title>PRESALE TICKET</Card.Title>
                        <Card.Text>
                          Rp
                          {Number(
                            an_event["presale-ticket-price"]
                          ).toLocaleString(`id-ID`)}
                          ,00
                        </Card.Text>
                        <Card.Text>
                          Stock: {an_event["presale-ticket-stock"]}
                        </Card.Text>
                        <Button onClick={() => setModalShowPresale(true)}>
                          Buy Presale ticket
                        </Button>
                        <ModalBuyPresale
                          show={modalShowPresale}
                          onHide={() => setModalShowPresale(false)}
                          eventid={eventid}
                          events_map={events_map}
                          fetchThisEvent={fetchThisEvent}
                        />
                      </>
                    ) : null}
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
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
                an_event={an_event}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SingleEventDisplay;
