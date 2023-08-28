import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../json-server/api";
import { useToast } from "@chakra-ui/react";
import { SVGcalendar, SVGlocation } from "./SVG";

export const TicketCardProfilePage = ({ eve, index, fetchPostedEvents }) => {
  const toast = useToast();
  const nav = useNavigate();
  async function deleteEvent(ev) {
    const today = new Date().toISOString().split("T")[0];

    if (
      window.confirm(`are you sure want to delete this event and its record?`)
    ) {
      if (ev.date_start > today) {
        if (window.confirm(`there might be several people buy tickets`)) {
          const res = await api.get(`/tickets/q?eventid=${ev.id}`);
          const all_ticket = [...res.data.data];
          if (all_ticket.length) {
            for (let item of all_ticket) {
              const res_user = await api.get(`users/${item.userid}`);
              const this_user = res_user.data;
              console.log(`this_user 1`, this_user);
              const temp_points = this_user.points;
              this_user.points = temp_points + item.ticketPrice;
              console.log(`this_user 2`, this_user);
              await api.patch(`/users/${item.userid}`, this_user);
              const a = await api.delete(`tickets/${item.id}`);
              toast({
                status: "success",
                title: "retrieving money",
                description: `successfully retrieving ${this_user.name} credits from ${temp_points} to ${this_user.points}`,
                isClosable: true,
                duration: 1500,
              });
            }
          }
          await api.delete(`/events/${ev.id}`);
        }
      } else {
        await api.delete(`/events/${ev.id}`);
      }
    }
    fetchPostedEvents();
  }
  return (
    <Col sm={6} md={4} lg={3} className="d-flex justify-content-center">
      <Card style={{ maxWidth: "18rem", width: "100%" }} key={index}>
        <a href={`/${eve?.id}/${eve?.name.replace(" ", "%20")}`}>
          <Card.Img
            variant="top"
            src={eve?.Photo_event[0].url}
            style={{
              maxWidth: "100%",
              aspectRatio: "2/1",
              objectFit: "fill",
            }}
          />
        </a>
        <Card.Body>
          <a href={`/${eve?.id}/${eve?.name.replace(" ", "%20")}`}>
            <Card.Title>{eve?.name}</Card.Title>
          </a>
          <Card.Text className="d-flex align-items-center">
            <span className="mr-2">
              {" "}
              <SVGlocation />
            </span>
            {eve?.Location?.location_name}
          </Card.Text>
          <Card.Text className="d-flex align-items-center">
            <span className="mr-2">
              <SVGcalendar />
            </span>
            {eve?.date_start}
          </Card.Text>

          <div className="flex" style={{ justifyContent: "space-between" }}>
            <button
              rel="stylesheet"
              onClick={() => nav(`/${eve?.id}/edit_event/${eve?.name}`)}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded :"
            >
              Edit Event
            </button>
            <button
              onClick={() => {
                deleteEvent(eve);
              }}
              className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-2 border-b-4 border-red-700 hover:border-red-500 rounded :"
            >
              Delete Event
            </button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
