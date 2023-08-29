import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const EventCardOnSearchPage = ({ this_event, index }) => {
  const navigate = useNavigate();
  return (
    <Col
      xs={12}
      md={6}
      lg={4}
      xl={4}
      className="my-2 d-flex justify-content-center col-card"
      key={index}
      type="button"
      onClick={() => navigate(`/${this_event?.id}/${this_event?.name}`)}
    >
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          referrerPolicy="no-referrer"
          src={this_event?.Photo_event[0].url}
          alt={this_event?.name}
          className="image-event"
        />
        <Card.Body>
          <Card.Title
            className="event-name"
            style={{ textTransform: "capitalize" }}
          >
            {this_event?.name}{" "}
            {this_event?.isfree ? (
              <>
                <img
                  src="https://media.istockphoto.com/id/807772812/photo/free-price-tag-label.jpg?s=612x612&w=0&k=20&c=1Dq0FHOKP2UbhglZajMe5In_48U8k4qrI1Y4l_h9NrY="
                  width={"50px"}
                  style={{ float: "right" }}
                />
              </>
            ) : null}
          </Card.Title>
          <Card.Text
            className="location"
            style={{ textTransform: "capitalize" }}
          >
            {this_event?.Location.location_name.toLowerCase()}
          </Card.Text>
          <Card.Text className="date">
            {new Date(this_event?.date_start).toString().slice(0, 15)}
          </Card.Text>
          <Card.Text className="description">
            {this_event?.description}
          </Card.Text>
          <Card.Text>
            <span>
              <span
                class="fa fa-star star-checked"
                style={{ marginRight: "4px" }}
              ></span>
              <b>
                {this_event?.Average_ratings
                  ? Number(this_event?.Average_ratings).toFixed(2)
                  : null}
              </b>
              {this_event?.Average_ratings ? `/5 ` : null}
            </span>
            <span>
              {this_event?.Number_of_ratings
                ? `(${this_event?.Number_of_ratings})`
                : `No ratings`}
            </span>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};
