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
  const { eventid, eventname } = useParams();
  const [an_event, setAn_event] = useState({});
  const [modalShow, setModalShow] = useState(false);
  try {
    const token = localStorage.getItem("auth")
  } catch (err) {
    console.log(err);
  }
  const fetchThisEvent = async () => {
    try {
      const res = await api.get(`/events/q?id=${eventid}`);
      setAn_event(res.data.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

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
    fetchThisEvent();
  }, []);

  return (
    <>
      <HeaderNavbar />
      <Container>
        <Row>
          <Card>
            <Card.Header as="h5">{an_event?.name}</Card.Header>
            <Carousel>
              {an_event?.Photo_event ? (
                an_event?.Photo_event.map((photo, idx) => (
                  <Carousel.Item key={idx}>
                    <Card.Img
                      variant="top"
                      referrerPolicy="no-referrer"
                      src={photo.url}
                      alt={an_event?.name}
                    />
                  </Carousel.Item>
                ))
              ) : (
                <SpinnerLoading />
              )}
            </Carousel>
            <Card.Body>
              <Row>
                <Col md={9}>
                  <Card.Title>{an_event?.name}</Card.Title>
                  <Card.Text>
                    <span>
                      <span
                        class="fa fa-star star-checked"
                        style={{ marginRight: "4px" }}
                      ></span>
                      <b>
                        {an_event?.Average_ratings &&
                          Number(an_event?.Average_ratings).toFixed(2)}
                      </b>
                      {an_event?.Average_ratings && `/5 `}
                    </span>
                    <span>
                      {an_event?.Number_of_ratings
                        ? `(${an_event?.Number_of_ratings} rating)`
                        : `No ratings`}
                    </span>
                  </Card.Text>
                  <Card.Text>{an_event?.description}</Card.Text>
                  <Card.Text>
                    <span
                      className="d-flex align-items-center"
                      style={{ gap: "5px" }}
                    >
                      <span>
                        <SVGcalendar />
                      </span>
                      <span>{an_event?.date_start}</span>
                      <span>
                        {an_event?.date_end ? `- ${an_event?.date_end}` : null}
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
                      <span>{an_event?.time_start}</span>
                      <span>
                        {an_event?.time_end ? `- ${an_event?.time_end}` : null}
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
                      <span>{an_event?.Location?.location_name},</span>
                      <span>{an_event?.venue}</span>
                    </span>
                  </Card.Text>
                  <Card.Text>
                    <span>Event poster: {an_event?.User?.username}</span>
                  </Card.Text>
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
                          {an_event?.vip_ticket_price ? (
                            <>
                              <Card.Title>VIP TICKET</Card.Title>
                              <Card.Text>
                                Rp
                                {Number(
                                  an_event?.vip_ticket_price
                                ).toLocaleString(`id-ID`)}
                                ,00
                              </Card.Text>
                              <Card.Text>
                                Stock: {an_event?.vip_ticket_stock}
                              </Card.Text>
                              <Button
                                className="mb-3"
                                onClick={() => setModalShow(true)}
                              >
                                Buy VIP ticket
                              </Button>
                              <ModalBuy
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                eventid={eventid}
                                fetchThisEvent={fetchThisEvent}
                              />
                            </>
                          ) : null}
                          {an_event?.presale_ticket_price ? (
                            <>
                              <Card.Title>PRESALE TICKET</Card.Title>
                              <Card.Text>
                                Rp
                                {Number(
                                  an_event?.presale_ticket_price
                                ).toLocaleString(`id-ID`)}
                                ,00
                              </Card.Text>
                              <Card.Text>
                                Stock: {an_event?.presale_ticket_stock}
                              </Card.Text>
                              <Button onClick={() => setModalShow(true)}>
                                Buy Presale ticket
                              </Button>
                              <ModalBuyPresale
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                eventid={eventid}
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
            </Card.Body>
          </Card>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col lg={6} md={12}>
            <Card>
              <Card.Header as="h5">Comments and Review</Card.Header>
              <Card.Body>
                <FetchReviews eventid={eventid} />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} md={12}>
            <Card>
              <Card.Header as="h5">
                Ask anything about the event below
              </Card.Header>
              <FetchDiscussion eventid={eventid} />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SingleEventDisplay;
