import { MDBCardText, MDBCardBody } from "mdb-react-ui-kit";
import uuid from "react-uuid";
import { Button, Col } from "react-bootstrap";
import { ReviewAnEvent } from "../pages/EventReview";
import { useState } from "react";
import Barcode from "react-barcode";

export const Ticket = ({ ticket, index, getTicket }) => {
  const [show, setShow] = useState("");
  const handleClose = () => setShow("");
  const handleShow = () => setShow("modalReview");
  return (
    <Col sm={6} md={4} lg={3}>
      <MDBCardBody
        className="text-center"
        id="card bawah"
        style={{ border: "1px solid" }}
      >
        <MDBCardText
          className="mb-1 h5"
          style={{ textTransform: "capitalize" }}
        >
          <a
            href={`/${ticket?.eventid}/${ticket?.Event?.name.replace(
              " ",
              "%20"
            )}`}
          >
            {ticket?.Event.name}
          </a>
        </MDBCardText>
        <div className="mb-4 pb-2 border-2 d-flex justify-content-center">
          <Barcode
            value={ticket?.ticketcode}
            width={0.6}
            displayValue={false}
          />
        </div>
        <div className="d-flex m-2 align-items-center">
          <MDBCardText
            className="small text-muted m-0"
            style={{ maxWidth: "70px" }}
          >
            Event Date:
          </MDBCardText>
          <MDBCardText className="mb-1 h5 ml-2">
            {ticket?.Event?.date_start}
          </MDBCardText>
        </div>
        <div className="d-flex m-2 align-items-center">
          <MDBCardText
            className="small text-muted m-0"
            style={{ maxWidth: "70px" }}
          >
            Your Ticket Number:
          </MDBCardText>
          <MDBCardText className="mb-1 h5 ml-2">
            {ticket?.ticketcode}
          </MDBCardText>
        </div>
        <div className="d-flex" style={{ gap: "5px" }}>
          <Button>
            <a
              href={`/${ticket?.eventid}/${ticket?.Event?.name.replace(
                " ",
                "%20"
              )}`}
            >
              See Event Page
            </a>
          </Button>
          {ticket?.Review ? null : (
            <Button onClick={handleShow}>Review this event</Button>
          )}
        </div>
        <ReviewAnEvent
          ticket={ticket}
          show={show}
          handleClose={handleClose}
          index={index}
          getTicket={getTicket}
        />
      </MDBCardBody>
    </Col>
  );
};
