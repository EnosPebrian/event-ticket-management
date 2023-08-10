import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import uuid from "react-uuid";

export const Ticket = () => {
  const ticketNumber = uuid();
  return (
    <>
      <MDBCardBody
        className="text-center"
        id="card bawah"
        style={{ border: "1px solid" }}
      >
        <MDBCardText className="mb-1 h5">Your Tickets:</MDBCardText>
        <div className="mb-4 pb-2 border-2 w-30 h-32">
          <img src="" alt="img ticket" />
        </div>
        <div className="d-flex justify-around text-center mt-2 mb-2">
          <div>
            <MDBCardText className="small text-muted mb-0">
              Event Name:
            </MDBCardText>
            <MDBCardText className="mb-1 h5">Event Name here()</MDBCardText>
          </div>
          <div>
            <MDBCardText className="small text-muted mb-0">
              Event Date:
            </MDBCardText>
            <MDBCardText className="mb-1 h5">Event Date here()</MDBCardText>
          </div>
        </div>
        <div className="d-flex justify-content-between text-center mt-3 pt-3">
          Your Ticket Number: &emsp; {ticketNumber}
        </div>
      </MDBCardBody>
    </>
  );
};
