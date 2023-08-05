import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import imageDefault from "../components/asserts/default-image.jpg";
import "../components/style.css";

import { useEffect, useState } from "react";
import { useFormik } from "formik/dist";
import { Input } from "@chakra-ui/input";
import { values } from "lodash";
import api from "../json-server/api";
export const ModalCreate = ({
  events,
  setEvents,
  handleClose,
  show,
  fetchEvents,
}) => {
  const formik = useFormik({
    initialValues: {
      id: "",
      photo: "",
      name: "",
      location: "",
      "date-start": "",
      "date-end": "",
      time: "",
      description: "",
      ticketcategory: [],
      price: "",
      stock: "",
    },
    onSubmit: (values) => {
      const tempPhoto = [];
      tempPhoto.push(values.photo);
      values["photo"] = tempPhoto;
      console.log(values, tempPhoto);
      const tmp = [...events];
      tmp.push(values);
      api.post("/events", values);
      setEvents(tmp);
      handleClose();
      fetchEvents();
      window.location.reload(false);
    },
  });
  console.log("ini formik", formik.values);

  return (
    <>
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={events?.photo ? events?.photo : imageDefault}></img>
          <Input
            id="photo"
            placeholder="Image URL"
            mb={"20px"}
            onChange={(e) => formik.setFieldValue(e.target.id, e.target.value)}
            defaultValue={events?.photo}
          ></Input>
          <Input
            id="name"
            placeholder="Name event"
            mb={"20px"}
            onChange={(e) => formik.setFieldValue(e.target.id, e.target.value)}
          ></Input>
          <Input
            id="description"
            placeholder="Description event"
            mb={"20px"}
            onChange={(e) => formik.setFieldValue(e.target.id, e.target.value)}
          ></Input>
          <Form.Group controlId="startdate">
            start date
            <Form.Control
              id="date-start"
              type="date"
              name="date-start"
              placeholder="Start date"
              onChange={formik.handleChange}
            />
          </Form.Group>
          end date
          <Form.Group controlId="enddate">
            <Form.Control
              id="date-end"
              type="date"
              name="date-end"
              placeholder="Start date"
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Input
            id="time"
            placeholder="Time"
            mb={"20px"}
            onChange={(e) => formik.setFieldValue(e.target.id, e.target.value)}
          ></Input>
          <Input
            id="location"
            placeholder="Location event"
            mb={"20px"}
            onChange={(e) => formik.setFieldValue(e.target.id, e.target.value)}
          ></Input>
          <Input
            id="ticketcategory"
            placeholder="Categori Event"
            mb={"20px"}
            onChange={(e) => formik.setFieldValue(e.target.id, e.target.value)}
          ></Input>
          <Input
            id="price"
            placeholder="Price"
            mb={"20px"}
            onChange={(e) => formik.setFieldValue(e.target.id, e.target.value)}
          ></Input>
          <Input
            id="stock"
            placeholder="Stock"
            mb={"20px"}
            onChange={(e) => formik.setFieldValue(e.target.id, e.target.value)}
          ></Input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
