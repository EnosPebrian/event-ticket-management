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
      <div
        className="text-center"
        id="card bawah"
        style={{
          boxShadow: "1px 2px 5px black",
          maxWidth: "160px",
          maxHeight: "360px",
          marginBottom: "4px",
        }}
      >
        <div className="font-bold border-b-2" style={{ fontSize: "19px" }}>
          Your Tickets:
        </div>
        <div className="mb-4 pb-2 border-2 w-30 h-32">
          <img
            src={photo}
            alt="img ticket"
            style={{ width: "550px", height: "125px", objectFit: "cover" }}
          />
        </div>
        <div className="col-auto">
          <div>
            <div className="small text-muted mb-0">{}</div>
            <div
              className="mb-1"
              style={{ fontWeight: "700", fontSize: "16px" }}
            >
              {this_event ? this_event.name : null}
            </div>
          </div>
          <div style={{ display: "col" }}>
            <MDBCardText className=" mb-0" style={{ fontWeight: "500" }}>
              Event Date:
            </MDBCardText>
            <div className="h-7">{datestart}</div>
          </div>
        </div>
        <div
          className="d-flex text-center "
          style={{ fontWeight: "500", justifyContent: "center" }}
        >
          Your Ticket Number:
        </div>
        <div>{ticketNumber}</div>
      </div>
    </>
  );
};
