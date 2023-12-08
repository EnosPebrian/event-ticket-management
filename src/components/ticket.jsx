import { MDBCardText, MDBCardBody } from "mdb-react-ui-kit";
import { Button, Col } from "react-bootstrap";
import { ReviewAnEvent } from "../pages/EventReview";
import { useState } from "react";
import Barcode from "react-barcode";
import { EditReviewAnEvent } from "./editReview";

export const Ticket = ({ ticket, index, getTicket }) => {
  const [show, setShow] = useState("");
  const handleClose = () => setShow("");
  const handleShow = () => setShow("modalReview");
  const handleShowEdit = () => setShow("modalEdit");
  return (
    <Col
      sm={12}
      md={6}
      lg={4}
      style={{
        borderRadius: "14px",
        border: "1px solid black",
        boxShadow: "2px 3px 6px black",
      }}
      className="bg-white p-4"
    >
      <MDBCardBody
        className="text-center p-2"
        id="card bawah"
        style={{ border: "1px solid", boxShadow: "2px 3px 6px black" }}
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
          {ticket?.Review ? (
            ticket?.Review?.timediff < "00:30:00" ? (
              <Button onClick={handleShowEdit}>Edit review</Button>
            ) : null
          ) : (
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
        <EditReviewAnEvent
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
