import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../json-server/api";
import HeaderNavbar from "../components/Header-navbar";
import SpinnerLoading from "../components/SpinnerLoading";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SelectLocationOpt } from "../components/asserts/Select location ANTD";
import {
  Card,
  Container,
  Carousel,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";

export default function EditEvent() {
  const { eventid, eventname } = useParams();
  const [thisEvent, setThisEvent] = useState({});

  async function fetchData() {
    await api
      .get(`/events/q?id=${eventid}`)
      .then((result) => setThisEvent(result.data.data[0]))
      .catch((err) => console.log(err));
  }

  const formik = useFormik({
    initialValues: {
      name: thisEvent.name,
      location: thisEvent.Location?.location_name,
      venue: thisEvent.venue,
      category: thisEvent.Event_category?.category,
      date_start: thisEvent.date_start,
      date_end: thisEvent.date_end,
      time_start: thisEvent.time_start,
      time_end: thisEvent.time_end,
      description: thisEvent.description,
      vip_ticket_price: thisEvent.vip_ticket_price,
      vip_ticket_stock: thisEvent.vip_ticket_stock,
      presale_ticket_price: thisEvent.presale_ticket_price,
      presale_ticket_stock: thisEvent.presale_ticket_stock,
      normal_ticket_price: thisEvent.normal_ticket_price,
      normal_ticket_stock: thisEvent.normal_ticket_stock,
      image1: thisEvent.Photo_event ? thisEvent?.Photo_event[0]?.url : "",
      image2: thisEvent.Photo_event ? thisEvent?.Photo_event[1]?.url : "",
      image3: thisEvent.Photo_event ? thisEvent?.Photo_event[2]?.url : "",
      isfree: true,
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      vip_ticket_price: Yup.number()
        .min(0, "cannot be a negative number")
        .nullable(true),
      vip_ticket_stock: Yup.number()
        .min(0, "cannot be a negative number")
        .nullable(true),
      presale_ticket_price: Yup.number()
        .min(0, "cannot be a negative number")
        .nullable(true),
      presale_ticket_stock: Yup.number()
        .min(0, "cannot be a negative number")
        .nullable(true),
      normal_ticket_price: Yup.number()
        .min(0, "cannot be a negative number")
        .nullable(true),
      normal_ticket_stock: Yup.number()
        .min(0, "cannot be a negative number")
        .nullable(true),
    }),
    onSubmit: async (values) => {
      if (window.confirm("Are you sure want to apply changes?")) {
        const temp = { ...values };
        if (
          temp.vip_ticket_price ||
          temp.presale_ticket_price ||
          temp.normal_ticket_price
        ) {
          temp.isfree = false;
        }
        await api.patch(`/events/${eventid}`, temp).then(() => fetchData());
        // await api
      }
    },
  });

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchData();
  }, [formik.handleSubmit]);

  return (
    <>
      <HeaderNavbar />
      <Container>
        <Card className="text-center">
          <Card.Header>Edit Your Event</Card.Header>
          <Card.Body>
            <Card.Title>Edit your data below</Card.Title>
            <Carousel>
              {thisEvent?.Photo_event ? (
                thisEvent?.Photo_event.map((photo, idx) => (
                  <Carousel.Item key={idx}>
                    <Card.Img
                      variant="top"
                      referrerPolicy="no-referrer"
                      src={photo.url}
                      alt={thisEvent?.name}
                    />
                  </Carousel.Item>
                ))
              ) : (
                <SpinnerLoading />
              )}
            </Carousel>
            <Card.Text>
              <Form className="mt-3">
                <Row>
                  <Col>
                    <Form.Label htmlFor="points">Event Name</Form.Label>
                    <Form.Control
                      type="text"
                      id="name"
                      name="name"
                      aria-describedby=""
                      value={formik.values.name}
                      onChange={(e) =>
                        formik.setFieldValue(e.target.id, e.target.value)
                      }
                      required
                    />
                    <Form.Label htmlFor="points">Category</Form.Label>
                    <Form.Control
                      type="text"
                      id="category"
                      name="category"
                      aria-describedby=""
                      value={formik.values.category}
                      onChange={(e) =>
                        formik.setFieldValue(e.target.id, e.target.value)
                      }
                      required
                    />
                    <Form.Label htmlFor="points">Location (City)</Form.Label>
                    <Form.Control
                      type="text"
                      id="location"
                      name="location"
                      aria-describedby=""
                      value={formik.values.location}
                      onChange={(e) =>
                        formik.setFieldValue(e.target.id, e.target.value)
                      }
                      required
                    />
                    <Form.Label htmlFor="points">Venue</Form.Label>
                    <Form.Control
                      type="text"
                      id="venue"
                      name="venue"
                      aria-describedby=""
                      value={formik.values.venue}
                      onChange={(e) =>
                        formik.setFieldValue(e.target.id, e.target.value)
                      }
                      required
                    />
                    <Form.Label htmlFor="points">
                      Description or details
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      id="description"
                      name="description"
                      aria-describedby=""
                      value={formik.values.description}
                      style={{
                        height: "176px",
                        wordWrap: "normal",
                        overflowWrap: "break-word",
                      }}
                      required
                      onChange={(e) =>
                        formik.setFieldValue(e.target.id, e.target.value)
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Label htmlFor="points">Image url 1</Form.Label>
                    <Form.Control
                      type="text"
                      id="image1"
                      name="image1"
                      aria-describedby=""
                      value={formik.values?.image1}
                      onChange={(e) =>
                        formik.setFieldValue(e.target.id, e.target.value)
                      }
                      required
                    />
                    <Form.Label htmlFor="points">Image url 2</Form.Label>
                    <Form.Control
                      type="text"
                      id="image2"
                      name="image2"
                      placeholder="optional"
                      aria-describedby=""
                      value={formik.values?.image2}
                      onChange={(e) =>
                        formik.setFieldValue(e.target.id, e.target.value)
                      }
                    />
                    <Form.Label htmlFor="points">Image url 3</Form.Label>
                    <Form.Control
                      type="text"
                      id="image3"
                      name="image3"
                      placeholder="optional"
                      aria-describedby=""
                      value={formik.values?.image3}
                      onChange={(e) =>
                        formik.setFieldValue(e.target.id, e.target.value)
                      }
                    />
                    <Form.Label htmlFor="points">Date start</Form.Label>
                    <Form.Control
                      type="date"
                      id="date_start"
                      name="date_start"
                      aria-describedby=""
                      value={formik.values.date_start}
                      onChange={(e) =>
                        formik.setFieldValue(e.target.id, e.target.value)
                      }
                      required
                    />
                    <Form.Label htmlFor="points">Date end</Form.Label>
                    <Form.Control
                      type="date"
                      id="date_end"
                      name="date_end"
                      aria-describedby=""
                      value={formik.values.date_end}
                      onChange={(e) =>
                        formik.setFieldValue(e.target.id, e.target.value)
                      }
                    />
                    <Form.Label htmlFor="points">Time start</Form.Label>
                    <Form.Control
                      type="time"
                      id="time_start"
                      name="time_start"
                      aria-describedby=""
                      value={formik.values.time_start}
                      onChange={(e) =>
                        formik.setFieldValue(e.target.id, e.target.value)
                      }
                      required
                    />
                    <Form.Label htmlFor="points">Time end</Form.Label>
                    <Form.Control
                      type="time"
                      id="time-end"
                      name="time-end"
                      aria-describedby=""
                      value={formik.values.time_end}
                      onChange={(e) =>
                        formik.setFieldValue(e.target.id, e.target.value)
                      }
                    />
                  </Col>
                </Row>
                <Row className="mt-5">
                  <Col>
                    <Form.Label htmlFor="points">
                      VIP Ticket Price: Rp
                      {Number(formik.values?.vip_ticket_price).toLocaleString(
                        "id-ID"
                      )}
                      ,00 {formik.errors.vip_ticket_price}
                    </Form.Label>
                    <Form.Control
                      type="number"
                      id="vip_ticket_price"
                      name="vip_ticket_price"
                      aria-describedby=""
                      value={formik.values?.vip_ticket_price}
                      onChange={(e) =>
                        formik.setFieldValue(e.target.id, e.target.value)
                      }
                      required
                    />
                    <Form.Label htmlFor="points">
                      VIP Ticket Stock: {formik.errors.vip_ticket_stock}
                    </Form.Label>
                    <Form.Control
                      type="number"
                      id="vip_ticket_stock"
                      name="vip_ticket_stock"
                      aria-describedby=""
                      value={formik.values?.vip_ticket_stock}
                      onChange={(e) =>
                        formik.setFieldValue(e.target.id, e.target.value)
                      }
                      required
                    />
                  </Col>
                  <Col>
                    <Form.Label htmlFor="points">
                      Presale Ticket Price: Rp
                      {Number(
                        formik.values?.presale_ticket_price
                      ).toLocaleString("id-ID")}
                      ,00 {formik.errors.presale_ticket_price}
                    </Form.Label>
                    <Form.Control
                      type="number"
                      id="presale_ticket_price"
                      name="presale_ticket_price"
                      aria-describedby=""
                      value={formik.values?.presale_ticket_price}
                      onChange={(e) =>
                        formik.setFieldValue(e.target.id, e.target.value)
                      }
                      required
                    />
                    <Form.Label htmlFor="points">
                      Presale Ticket Stock: {formik.errors.presale_ticket_stock}
                    </Form.Label>
                    <Form.Control
                      type="number"
                      id="presale_ticket_stock"
                      name="presale_ticket_stock"
                      aria-describedby=""
                      value={formik.values?.presale_ticket_stock}
                      onChange={(e) =>
                        formik.setFieldValue(e.target.id, e.target.value)
                      }
                      required
                    />
                  </Col>
                  <Col>
                    <Form.Label htmlFor="points">
                      Normal Ticket Price: Rp
                      {Number(
                        formik.values?.normal_ticket_price
                      ).toLocaleString("id-ID")}
                      ,00 {formik.errors.normal_ticket_price}
                    </Form.Label>
                    <Form.Control
                      type="number"
                      id="normal_ticket_price"
                      name="normal_ticket_price"
                      aria-describedby=""
                      value={formik.values?.normal_ticket_price}
                      onChange={(e) =>
                        formik.setFieldValue(e.target.id, e.target.value)
                      }
                      required
                    />
                    <Form.Label htmlFor="points">
                      Normal Ticket Stock: {formik.errors.normal_ticket_stock}
                    </Form.Label>
                    <Form.Control
                      type="number"
                      id="normal_ticket_stock"
                      name="normal_ticket_stock"
                      aria-describedby=""
                      value={formik.values?.normal_ticket_stock}
                      onChange={(e) =>
                        formik.setFieldValue(e.target.id, e.target.value)
                      }
                      required
                    />
                  </Col>
                </Row>
                <SelectLocationOpt formik={formik} />
              </Form>
            </Card.Text>
            <Button variant="primary" onClick={formik.handleSubmit}>
              Apply
            </Button>
          </Card.Body>
          <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
      </Container>
    </>
  );
}
