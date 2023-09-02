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
  fetchEven,
  fetchEvents,
}) => {
  let userProfile;
  let userid;
  console.log("user profile", userid);

  try {
    userProfile = JSON.parse(localStorage.getItem("auth"));
    userid = userProfile.id;
  } catch (err) {
    console.log(err);
  }

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
      "event-creator": userid,
      isfree: 1,
    },
    onSubmit: async (values) => {
      const temp = { ...values };

      console.log("ghalo", values["description"], values["category"]);
      if (temp["vip-ticket-price"] && temp["presale-ticket-price"]) {
        temp["isfree"] = 0;
        const tmpPhoto = [];
        tmpPhoto.push(temp["photo"]);
        temp.photo = tmpPhoto;
        await api.post("/events", temp);
        closeModal();
      } else {
        const tmpPhoto = [];
        tmpPhoto.push(temp["photo"]);
        temp.photo = tmpPhoto;
        await api.post("/events", temp);
        closeModal();
      }
      const res_this_event = await api.get(
        `/events?name=${temp.name}&location=${temp.location}&venue=${temp.venue}`
      );
      console.log(`1`, res_this_event);
      const eventid = res_this_event.data[0].id;
      const res_user = await api.get(`users/${userid}`);
      const datauser = res_user.data;
      datauser.events.push(eventid);
      await api.patch(`users/${datauser.id}`, datauser);
      fetchEven();
      fetchEvents();
      closeModal();
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(),
      "date-start": yup.string().required(),
      "date-end": yup.string().required(),
      "time-start": yup.string().required(),
      "time-end": yup.string().required(),
    }),
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        document.getElementById("img-default").src = reader.result;
        formik.setFieldValue("photo", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {}, []);
  return (
    <>
      <Modal show={isModalOpen} closeModal={closeModal}>
        <Modal.Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Modal.Title style={{ fontWeight: "700", fontSize: "28px" }}>
            Create Event
          </Modal.Title>
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
            <img
              id="img-default"
              src={imageDefault}
              className="mb-8"
              style={{ boxShadow: "1px 2px 4px black" }}
            ></img>
            <input
              type="file"
              accept="image/"
              id="photo"
              placeholder="Image URL"
              mb={"20px"}
              onChange={handleImageChange}
              required
              className="bg-gray-100 rounded-md p-2 w-96 "
              style={{ boxShadow: "1px 2px 4px black" }}
            ></input>
            <Input
              id="name"
              placeholder="Name event"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              required
              className="bg-gray-100 rounded-md p-2 w-96 mt-6"
              style={{ boxShadow: "1px 2px 4px black" }}
            ></Input>
            <Input
              id="location"
              placeholder="Location event"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              style={{ boxShadow: "1px 2px 4px black" }}
              required
              className="bg-gray-100 rounded-md p-2 w-96"
            ></Input>
            <Input
              id="venue"
              placeholder="Venue event"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              required
              className="bg-gray-100 rounded-md p-2 w-96"
              style={{ boxShadow: "1px 2px 4px black" }}
            ></Input>
            <Input
              id="category"
              placeholder="Category event"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              required
              className="bg-gray-100 rounded-md p-2 w-96"
              style={{ boxShadow: "1px 2px 4px black" }}
            ></Input>
            <Form.Group>
              <span
                style={{
                  backgroundColor: "#dec378",
                  borderRadius: "4px",
                  padding: "2px",
                  fontWeight: "500",
                }}
              >
                Start date
              </span>
              <Form.Control
                id="date-start"
                type="date"
                name="date-start"
                placeholder="Start date"
                onChange={formik.handleChange}
                required
                className="bg-gray-100 rounded-md p-2 w-96 mb-3"
                style={{ boxShadow: "1px 2px 4px black" }}
              />
            </Form.Group>
            <span
              style={{
                backgroundColor: "#dec378",
                borderRadius: "4px",
                padding: "2px",
                fontWeight: "500",
              }}
            >
              End date
            </span>
            <Form.Group>
              <Form.Control
                id="date-end"
                type="date"
                name="date-end"
                placeholder="End date"
                onChange={formik.handleChange}
                required
                className="bg-gray-100 rounded-md p-2 w-96 mb-3"
                style={{ boxShadow: "1px 2px 4px black" }}
              />
            </Form.Group>
            <span
              style={{
                backgroundColor: "#dec378",
                borderRadius: "4px",
                padding: "2px",
                fontWeight: "500",
              }}
            >
              Time start
            </span>
            <Input
              id="time-start"
              placeholder="Time start"
              type="time"
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              required
              className="bg-gray-100 rounded-md p-2 w-96 mb-3"
              style={{ boxShadow: "1px 2px 4px black" }}
            ></Input>
            <span
              style={{
                backgroundColor: "#dec378",
                borderRadius: "4px",
                padding: "2px",
                fontWeight: "500",
              }}
            >
              Time end
            </span>

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
              style={{ boxShadow: "1px 2px 4px black" }}
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
              style={{ boxShadow: "1px 2px 4px black" }}
            ></Input>
            <Input
              id="vip-ticket-price"
              placeholder="Price for vip"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              className="bg-gray-100 rounded-md p-2 w-96"
              style={{ boxShadow: "1px 2px 4px black" }}
            ></Input>
            <Input
              id="vip-ticket-stock"
              placeholder="Stock ticket for vip"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              className="bg-gray-100 rounded-md p-2 w-96"
              style={{ boxShadow: "1px 2px 4px black" }}
            ></Input>
            <Input
              id="presale-ticket-price"
              placeholder="Price for ticket presale"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              className="bg-gray-100 rounded-md p-2 w-96"
              style={{ boxShadow: "1px 2px 4px black" }}
            ></Input>
            <Input
              id="presale-ticket-stock"
              placeholder="Stock for ticket prisale"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              className="bg-gray-100 rounded-md p-2 w-96"
              style={{ boxShadow: "1px 2px 4px black" }}
            ></Input>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="success" onClick={formik.handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
