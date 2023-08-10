import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import imageDefault from "../components/asserts/default-image.jpg";
import "../components/style.css";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useFormik } from "formik/dist";
import { Input } from "@chakra-ui/input";
import { values } from "lodash";
import api from "../json-server/api";
import image from "../components/asserts/default-image.jpg";

export const ModalCreate = ({
  isModalOpen,
  setIsModalOpen,
  openModal,
  closeModal,
}) => {
  const userProfile = localStorage.getItem("auth");
  const user = { ...userProfile };
  console.log("ini", user.username);

  // Time input
  const now = new Date();
  const [time, setTime] = useState({
    hour: now.getHours(),
  });

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      location: "",
      venue: "",
      category: "",
      "date-start": "",
      "date-end": "",
      "time-start": "",
      "time-end": "",
      description: "",
      photo: "",
      "vip-ticket-price": "",
      "vip-ticket-stock": "",
      "presale-ticket-price": "",
      "presale-ticket-stock": "",
      "event-creator": {},
    },
    onSubmit: (values) => {
      const data = api.get("/events");
      console.log("data yang berhasil dikirim", data);
    },
  });
  useEffect(() => {}, []);
  return (
    <>
      <Modal show={isModalOpen} closeModal={closeModal}>
        <Modal.Header>
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Form onSubmit={formik.handleSubmit} className="  w-96">
            <img src={image} className="mb-8"></img>
            <Input
              id="photo"
              placeholder="Image URL"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              defaultValue={""}
              required
              className="bg-gray-100 rounded-md p-2 w-96"
            ></Input>
            <Input
              id="name"
              placeholder="Name event"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              required
              className="bg-gray-100 rounded-md p-2 w-96"
            ></Input>
            <Input
              id="location"
              placeholder="Location event"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              required
              className="bg-gray-100 rounded-md p-2 w-96"
            ></Input>
            <Form.Group controlId="startdate">
              start date
              <Form.Control
                id="date-start"
                type="date"
                name="date-start"
                placeholder="Start date"
                onChange={formik.handleChange}
                required
                className="bg-gray-100 rounded-md p-2 w-96"
              />
            </Form.Group>
            end date
            <Form.Group controlId="enddate">
              <Form.Control
                id="date-end"
                type="date"
                name="date-end"
                placeholder="End date"
                onChange={formik.handleChange}
                required
                className="bg-gray-100 rounded-md p-2 w-96"
              />
            </Form.Group>
            Time start
            <Input
              id="time-start"
              placeholder="Time start"
              type="time"
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              required
              className="bg-gray-100 rounded-md p-2 w-96"
            ></Input>
            Time end
            <Input
              id="time-end"
              type="time"
              placeholder="Time start"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              required
              className="bg-gray-100 rounded-md p-2 w-96"
            ></Input>
            <Input
              id="description"
              placeholder="Description event"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              required
              className="bg-gray-100 rounded-md p-2 w-96"
            ></Input>
            <Input
              id="vip-ticket-price"
              placeholder="Price for vip"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              required
              className="bg-gray-100 rounded-md p-2 w-96"
            ></Input>
            <Input
              id="vip-ticket-stock"
              placeholder="Stock ticket for vip"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              required
              className="bg-gray-100 rounded-md p-2 w-96"
            ></Input>
            <Input
              id="presale-ticket-price"
              placeholder="Price for ticket presale"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              required
              className="bg-gray-100 rounded-md p-2 w-96"
            ></Input>
            <Input
              id="presale-ticket-stock"
              placeholder="Stock for ticket prisale"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              required
              className="bg-gray-100 rounded-md p-2 w-96"
            ></Input>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
