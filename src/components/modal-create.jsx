import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Center,
  Input,
  Img,
} from "@chakra-ui/react";

import imageDefault from "../components/asserts/default-image.jpg";
import "../components/style.css";

import { useEffect, useState } from "react";
import { useFormik } from "formik/dist";
export const ModalCreate = ({ isOpen, onClose, events, setEvents, id }) => {
  const formik = useFormik({
    initialValues: {
      id: "",
      photo: "",
      name: "",
      location: "",
      date: "",
      time: "",
      description: "",
      ticketcategory: [],
      price: "",
      stock: "",
    },
  });
  console.log(formik.values);
  useEffect(() => {}, []);
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <ModalOverlay />
        <ModalContent alignItems={"center"} justifyContent={"center"}>
          <ModalHeader>Input your event here</ModalHeader>
          <ModalBody>
            <Img
              width={"800px"}
              height={"450px"}
              mb={"20px"}
              src={events?.photo ? events?.photo : imageDefault}
            ></Img>
            <Input
              id="photo"
              placeholder="Image URL"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              defaultValue={events?.photo}
            ></Input>
            <Input
              id="name"
              placeholder="Name event"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
            ></Input>
            <Input
              id="description"
              placeholder="Description event"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
            ></Input>
            <Input
              id="date"
              placeholder="Date"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
            ></Input>
            <Input
              id="time"
              placeholder="Time"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
            ></Input>
            <Input
              id="location"
              placeholder="Location event"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
            ></Input>
            <Input
              id="ticketcategory"
              placeholder="Categori Event"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
            ></Input>
            <Input
              id="price"
              placeholder="Price"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
            ></Input>
            <Input
              id="stock"
              placeholder="Stock"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
            ></Input>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="ghost" onClick={""}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
