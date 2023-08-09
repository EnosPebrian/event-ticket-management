import { useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import api from "../json-server/api";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import SpinnerLoading from "../components/SpinnerLoading";
import { useFormik } from "formik";

export const SearchPage = () => {
  const navigate = useNavigate();
  const { searchkey } = useParams();
  const [filtered, setFiltered] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [location, setLocation] = useState([]);
  const [category, setCategory] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const [value, setValue] = useState({});
  const [events, setEvents] = useState([]);
  const [users_map, setUsers_map] = useState(new Map());
  const [events_map, setEvents_map] = useState(new Map());

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

  //update Events dan Users pertama kali setelah document terload
  useEffect(() => {
    fetchEventsMap();
    fetchUsersMap();
  }, []);

  const fetchAllEvents = async () => {
    try {
      const res_events = await api.get("/events");
      setEvents([...res_events.data]);
      console.log(events);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAllEvents();
    fetchRating();
  }, []);

  const formik = useFormik({
    initialValues: {
      searchform: "",
      startdate: "",
      completed_event: false,
      enddate: "",
      location: [],
      category: [],
    },
    onSubmit: (values) => {
      setValue(values);
    },
  });

  const updatefilter = async () => {
    const filter_hashmap = new Set();
    const new_filtered = [];
    let temp = [...filtered];

    if (value.searchform) {
      const res = await api.get(`events?q=${value.searchform}`);
      temp = [...res.data];
    } else {
      const res = await api.get(`events`);
      temp = [...res.data];
    }

    if (value.startdate && !value.completed_event) {
      value["date-start"] = today;
    }
    if (value.startdate) {
      temp = temp.filter((val) => val["date-start"] > value.startdate);
    }

    if (value.enddate) {
      temp = temp.filter((val) => val["date-end"] <= value.enddate);
    }

    try {
      if (value.location.length && value.category.length) {
        const temp_set = new Set();
        let a = [];
        for (let i of value?.location) {
          for (let item of temp) {
            if (item.location == i) temp_set.add(item.id);
          }
        }
        for (let i of value?.category) {
          for (let item of temp) {
            if (item.category == i && temp_set.has(item.id)) {
              filter_hashmap.add(item.id);
            }
          }
        }
      } else if (!value?.location.length && !value?.category.length) {
        for (let item of temp) filter_hashmap.add(item.id);
      } else {
        if (value?.location.length) {
          for (let i of value.location) {
            for (let item of temp) {
              if (item.location == i) {
                filter_hashmap.add(item.id);
              }
            }
          }
        }

        if (value?.category.length) {
          for (let i of value.category) {
            for (let item of temp) {
              if (item.category == i) {
                filter_hashmap.add(item.id);
              }
            }
          }
        }
      }

      for (let id of filter_hashmap) {
        new_filtered.push(events_map.get(id));
      }

      setFiltered(new_filtered);
    } catch (err) {
      console.log(err);
    }
  };

  async function fetchEvents() {
    const temp_location = new Set();
    const temp_category = new Set();
    events.forEach((any_event) => {
      temp_location.add(any_event.location);
      temp_category.add(any_event.category);
    });
    setLocation(Array.from(temp_location));
    setCategory(Array.from(temp_category));
    if (searchkey) {
      const res = await api.get(`events?${searchkey}`);
      const temp_filter = res.data.filter(
        (thisevent) => thisevent["date-start"] > today
      );
      setFiltered([...temp_filter]);
    } else {
      const res = await api.get(`events`);
      const temp_filter = res.data.filter(
        (thisevent) => thisevent["date-start"] > today
      );
      setFiltered([...temp_filter]);
    }
  }

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
      temp_obj[element.id] = avg_rating;
      temp_total_reviews[element.id] = total_reviews;
      // console.log(temp_obj);
    });
    setRating_map(temp_obj);
    setRating_length(temp_total_reviews);
  }

  useEffect(() => {
    fetchEvents();
  }, [events]);

  useEffect(() => {
    fetchEvents();
    fetchRating();
  }, [searchkey]);

  useEffect(() => {
    updatefilter();
  }, [value]);

  useEffect(() => {
    formik.handleSubmit();
  }, [formik.values]);

  return (
    <>
      <Row>
        <Col lg={2} className="vh-100 mt-2" id="side-bar">
          <Row>
            <Button
              variant="primary"
              className="d-lg-none"
              onClick={handleShow}
            >
              Detailed Search Menu
            </Button>
          </Row>

          <Offcanvas
            show={show}
            onHide={handleClose}
            responsive="lg"
            className="bg-secondary p-2"
            style={{ borderRadius: "15px" }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Detailed Search</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body
              className="d-flex flex-column justify-content-between"
              style={{ gap: "10px", minWidth: "132px" }}
            >
              <Row>
                <h5>Detailed Search</h5>
              </Row>
              <Row>
                <Form className="d-flex">
                  <Form.Control
                    id="searchform"
                    name="searchform"
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        document
                          .getElementById("detailed-search-button")
                          .click();
                      }
                    }}
                    onChange={(e) =>
                      formik.setFieldValue(
                        e.target.name,
                        document.getElementById("searchform").value
                      )
                    }
                  />
                  <Button
                    xl={1}
                    id="detailed-search-button"
                    variant="primary"
                    onClick={formik.handleSubmit}
                  >
                    Find
                  </Button>
                </Form>
              </Row>
              <Row>
                <label>
                  <input
                    type="checkbox"
                    name="completed_event"
                    value="completed_event"
                    onChange={formik.handleChange}
                  />
                  Include previous events?
                </label>
              </Row>
              <Row>
                <h6>Date start</h6>
                <Form.Group controlId="startdate">
                  <Form.Control
                    type="date"
                    name="startdate"
                    placeholder="Start date"
                    onChange={formik.handleChange}
                  />
                </Form.Group>
              </Row>
              <Row>
                <h6>Date end</h6>
                <Form.Group controlId="enddate">
                  <Form.Control
                    type="date"
                    name="enddate"
                    placeholder="End date"
                    onChange={formik.handleChange}
                  />
                </Form.Group>
              </Row>

              <Row
                className="d-flex flex-column flex-nowrap"
                style={{
                  maxHeight: "25vh",
                  maxWidth: "100%",
                  overflowY: "scroll !important",
                  overflowX: "hidden",
                }}
              >
                <h6>Location</h6>
                {location?.length ? (
                  location.map((any_location, index) => (
                    <label key={index}>
                      <input
                        type="checkbox"
                        name="location"
                        value={any_location}
                        onChange={formik.handleChange}
                      />
                      {any_location}
                    </label>
                  ))
                ) : (
                  <SpinnerLoading />
                )}
              </Row>
              <Row
                className="d-flex flex-column flex-nowrap"
                style={{
                  maxHeight: "25vh",
                  maxWidth: "100%",
                  overflowY: "scroll !important",
                  overflowX: "hidden",
                }}
              >
                <h6>Categories</h6>
                {category?.length ? (
                  category.map((any_category, index) => (
                    <label key={index}>
                      <input
                        type="checkbox"
                        name="category"
                        value={any_category}
                        onChange={formik.handleChange}
                      />
                      {any_category}
                    </label>
                  ))
                ) : (
                  <SpinnerLoading />
                )}
              </Row>
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
        <Col>
          <Container>
            <Row>
              {filtered[0] &&
                filtered.map((this_event, index) => (
                  <Col
                    md={6}
                    lg={4}
                    xl={3}
                    className="my-2 d-flex justify-content-center col-card"
                    key={index}
                    type="button"
                    onClick={() =>
                      navigate(`/${this_event.id}/${this_event.name}`)
                    }
                  >
                    <Card style={{ width: "18rem" }}>
                      <Card.Img
                        variant="top"
                        referrerPolicy="no-referrer"
                        src={this_event.photo[0]}
                        alt={this_event.name}
                        className="image-event"
                      />
                      <Card.Body>
                        <Card.Title className="event-name">
                          {this_event.name}{" "}
                          {this_event.isfree ? (
                            <>
                              <img
                                src="https://media.istockphoto.com/id/807772812/photo/free-price-tag-label.jpg?s=612x612&w=0&k=20&c=1Dq0FHOKP2UbhglZajMe5In_48U8k4qrI1Y4l_h9NrY="
                                width={"50px"}
                                style={{ float: "right" }}
                              />
                            </>
                          ) : null}
                        </Card.Title>
                        <Card.Text className="location">
                          {this_event.location}
                        </Card.Text>
                        <Card.Text className="date">
                          {new Date(this_event["date-start"])
                            .toString()
                            .slice(0, 15)}
                        </Card.Text>
                        <Card.Text className="description">
                          {this_event.description}
                        </Card.Text>
                        <Card.Text>
                          <span>
                            <span
                              class="fa fa-star star-checked"
                              style={{ marginRight: "4px" }}
                            ></span>
                            <b>
                              {rating_map[this_event.id] &&
                                Number(rating_map[this_event.id]).toFixed(2)}
                            </b>
                            {rating_map[this_event.id] && `/5 `}
                          </span>
                          <span>
                            {rating_length[this_event.id]
                              ? `(${rating_length[this_event.id]})`
                              : `No ratings`}
                          </span>
                        </Card.Text>
                        <Button variant="primary">Reserve Ticket</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
};
