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
import api from "../json-server/api";
import { useEffect, useState } from "react";
import { Height } from "@mui/icons-material";

export const Ticket = ({ ticket }) => {
  const ticketNumber = uuid();
  const [events_map, setEvents_map] = useState(new Map());
  const [an_event, setAn_event] = useState([]);
  const [ini, setIni] = useState(false);

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

  console.log(events_map);

  const getEvent = async () => {
    const eventData = await api.get("/events");
    // console.log(eventData.data);
  };
  const this_event = events_map.get(ticket?.eventid);

  //date start
  let datestart;
  if (this_event?.name) {
    datestart = this_event["date-start"];
  }
  //   console.log(`1`, this_event?.name);
  //   console.log(this_event);

  //photo
  let photo;
  if (this_event?.photo) {
    photo = this_event.photo;
  }
  //   console.log(this_event.photo);

  useEffect(() => {
    getEvent();
    fetchEventsMap();
  }, []);

  useEffect(() => {
    getEvent();
  }, [ini]);

  return (
    <>
      <MDBCardBody
        className="text-center"
        id="card bawah"
        style={{ border: "1px solid" }}
      >
        <MDBCardText className="mb-1 h5">Your Tickets:</MDBCardText>
        <div className="mb-4 pb-2 border-2 w-30 h-32">
          <img
            src={photo}
            alt="img ticket"
            style={{ width: "550px", height: "125px", objectFit: "cover" }}
          />
        </div>
        <div className="d-flex justify-around text-center mt-2 mb-2">
          <div>
            <MDBCardText className="small text-muted mb-0">{}</MDBCardText>
            <MDBCardText className="mb-1 h5">
              {this_event ? this_event.name : null}
            </MDBCardText>
          </div>
          <div>
            <MDBCardText className="small text-muted mb-0">
              Event Date:
            </MDBCardText>
            <MDBCardText className="mb-1 h5">{datestart}</MDBCardText>
          </div>
        </div>
        <div className="d-flex justify-content-between text-center mt-3 pt-3">
          Your Ticket Number: &emsp; {ticketNumber}
        </div>
      </MDBCardBody>
    </>
  );
};
