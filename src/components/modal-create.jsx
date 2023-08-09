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

export const ModalCreate = ({
  isModalOpen,
  setIsModalOpen,
  openModal,
  closeModal,
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
    onSubmit: (values) => {},
  });

  return (
    <>
      <Modal show={isModalOpen} closeModal={closeModal}>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <img src={""}></img>
            <Input
              id="photo"
              placeholder="Image URL"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              defaultValue={""}
              required
            ></Input>
            <Input
              id="name"
              placeholder="Name event"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              required
            ></Input>
            <Input
              id="description"
              placeholder="Description event"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              required
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
                required
              />
            </Form.Group>
            <Input
              id="time"
              placeholder="Time"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              required
            ></Input>
            <Input
              id="location"
              placeholder="Location event"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              required
            ></Input>
            <Input
              id="ticketcategory"
              placeholder="Categori Event"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              required
            ></Input>
            <Input
              id="price"
              placeholder="Price"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              required
            ></Input>
            <Input
              id="stock"
              placeholder="Stock"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              required
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
