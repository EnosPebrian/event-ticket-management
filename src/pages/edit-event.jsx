// import { Card, Container, Form, Button, } from "react-bootstrap";

// export default function EditEvent() {
//   return (
//     <Container>
//       <Card className="text-center">
//         <Card.Header>Top Up Saldo</Card.Header>
//         <Card.Body>
//           <Card.Title>
//             Saldo saat ini: Rp
//             {Number(userSelector.points).toLocaleString(`id-ID`)},00
//           </Card.Title>
//           <Card.Text>
//             <Form className="mt-4 d-flex flex-column align-items-center">
//               <Form.Label htmlFor="points">Tambah Saldo</Form.Label>
//               <Form.Control
//                 type="number"
//                 id="pointsform"
//                 name="pointsform"
//                 aria-describedby=""
//                 min="0"
//                 style={{ width: "200px" }}
//               />
//             </Form>
//           </Card.Text>
//           <Button variant="primary" onClick={addsaldo}>
//             Top Up
//           </Button>
//         </Card.Body>
//         <Card.Footer className="text-muted">2 days ago</Card.Footer>
//       </Card>
//     </Container>
//   );
// }

import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import api from "../json-server/api";
import HeaderNavbar from "../components/Header-navbar";
import SpinnerLoading from "../components/SpinnerLoading";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function EditEvent() {
  const { eventid, eventname } = useParams();
  const [thisEvent, setThisEvent] = useState({});
  console.log(`eventid`, eventid);

  async function fetchData() {
    const res = await api.get(`/events/${eventid}`);
    const temp = res.data;
    setThisEvent(temp);
    console.log(temp, `1`, thisEvent);
  }

  const formik = useFormik({
    initialValues: {
      name: thisEvent.name,
      location: thisEvent.location,
      venue: thisEvent.venue,
      category: thisEvent.category,
      "date-start": thisEvent["date-start"],
      "date-end": thisEvent["date-end"],
      "time-start": thisEvent["time-start"],
      "time-end": thisEvent["time-end"],
      description: thisEvent.description,
      photo: [],
      image1: thisEvent.photo ? thisEvent.photo[0] : null,
      image2: thisEvent.photo ? thisEvent.photo[1] : null,
      image3: thisEvent.photo ? thisEvent.photo[2] : null,
      "event-creator": JSON.parse(localStorage.getItem("auth")).id,
      isfree: 1,
    },
    enableReinitialize: true,

    onSubmit: async (values) => {
      if (window.confirm("Are you sure want to apply changes?")) {
        const temp = { ...values };
        if (temp.image1) temp.photo.push(temp.image1);
        if (temp.image2) temp.photo.push(temp.image2);
        if (temp.image3) temp.photo.push(temp.image3);
        delete temp.image1;
        delete temp.image2;
        delete temp.image3;
        // console.log(temp);
        try {
          await api.patch(`events/${eventid}`, temp);
        } catch (err) {
          console.log(err);
        }
        fetchData();
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
    <Container>
      <Card className="text-center">
        <Card.Header>Edit Your Event</Card.Header>
        <Card.Body>
          <Card.Title>Edit your data below</Card.Title>
          <Carousel>
            {thisEvent?.photo ? (
              thisEvent?.photo.map((photo, idx) => (
                <Carousel.Item key={idx}>
                  <Card.Img
                    variant="top"
                    referrerPolicy="no-referrer"
                    src={photo}
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
                    id="date-start"
                    name="date-start"
                    aria-describedby=""
                    value={formik.values["date-start"]}
                    onChange={(e) =>
                      formik.setFieldValue(e.target.id, e.target.value)
                    }
                    required
                  />
                  <Form.Label htmlFor="points">Date end</Form.Label>
                  <Form.Control
                    type="date"
                    id="date-end"
                    name="date-end"
                    aria-describedby=""
                    value={formik.values["date-end"]}
                    onChange={(e) =>
                      formik.setFieldValue(e.target.id, e.target.value)
                    }
                  />
                  <Form.Label htmlFor="points">Time start</Form.Label>
                  <Form.Control
                    type="time"
                    id="time-start"
                    name="time-start"
                    aria-describedby=""
                    value={formik.values["time-start"]}
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
                    value={formik.values["time-end"]}
                    onChange={(e) =>
                      formik.setFieldValue(e.target.id, e.target.value)
                    }
                  />
                </Col>
              </Row>
            </Form>
          </Card.Text>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Apply
          </Button>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
    </Container>
  );
}
