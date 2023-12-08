import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import imageDefault from "../components/asserts/default-image.jpg";
import "../components/style.css";
import * as yup from "yup";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik/dist";
import { Input } from "@chakra-ui/input";
import { values } from "lodash";
import api from "../json-server/api";
import image from "../components/asserts/default-image.jpg";
import { useSelector } from "react-redux";
import { Image, Select } from "@chakra-ui/react";
import { renderImage } from "../lib/renderimge";
import { render } from "@testing-library/react";

export const ModalCreate = ({
  isModalOpen,
  setIsModalOpen,
  openModal,
  closeModal,
  fetchEven,
  fetchEvents,
}) => {
  const userSelector = useSelector((state) => state.auth);
  // Time input
  const now = new Date();
  const [time, setTime] = useState({
    hour: now.getHours(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      location: 0,
      venue: "",
      category: 0,
      date_start: "",
      date_end: "",
      time_start: "",
      time_end: "",
      description: "",
      url: "",
      vip_ticket_price: "",
      vip_ticket_stock: "",
      presale_ticket_price: "",
      presale_ticket_stock: "",
      normal_ticket_price: "",
      normal_ticket_stock: "",
      event_creator_userid: userSelector.id,
      isfree: 1,
      is_sponsored: "",
      image: null,
    },
    onSubmit: async (values) => {
      const temp = { ...values };
      await api.post("/events/create", temp).catch((err) => console.log(err));
    },
  });

  const [location, setLocation] = useState([]);
  const ref = useRef();
  const fetchLocationForSelectOption = async () => {
    await api
      .get("/locations/")
      .then((result) => setLocation(result.data))
      .catch((err) => console.log(err));
  };

  const [images, setImages] = useState([]);

  useEffect(() => {
    // console.log(formik.values.name);
    fetchLocationForSelectOption();
  }, [isModalOpen]);
  return (
    <>
      <Modal show={isModalOpen} closeModal={closeModal} size="full">
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
          <Form onSubmit={formik.handleSubmit}>
            <Image
              src={images}
              className="mb-8 object-fill"
              style={{ boxShadow: "1px 2px 4px black" }}
              cursor={"pointer"}
              onError={({ target }) => {
                target.onerror = null;
                target.src = imageDefault;
              }}
              onClick={() => ref.current.click()}
            ></Image>

            <input
              ref={ref}
              type="file"
              accept="image/*"
              placeholder="Image"
              mb={"20px"}
              onChange={async (e) => {
                // const url = await renderImage(e);
                // formik.setFieldValue("url", url);
                // formik.setFieldValue("image", e.target.files[0]);
                const newImages = [...images];
                for (const file of e.target.file) {
                  const url = await renderImage(file);
                  newImages.push({ url, file });
                }
                setImages(newImages);
              }}
              className="bg-gray-100 rounded-md p-2 w-28 text-gray-100 hidden"
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

            <Select
              placeholder="Select  or type location"
              className="bg-gray-100 rounded-md p-2 w-96 mb-3"
              style={{ boxShadow: "1px 2px 4px black" }}
              id="location"
              value={formik.values.location}
              onChange={(e) => formik.setFieldValue("location", e.target.value)}
            >
              {location.map((name, index) => (
                <option value={name?.id} key={`location-` + index}>
                  {name?.location_name}
                </option>
              ))}
            </Select>
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
            <Select
              placeholder="Select category"
              className="bg-gray-100 rounded-md p-2 w-96 mb-3"
              style={{ boxShadow: "1px 2px 4px black" }}
              id="category"
              value={formik.values.category}
              onChange={(selectOption) =>
                formik.setFieldValue("category", selectOption.target.value)
              }
            >
              <option value={1}>Music</option>
              <option value={2}>Sport</option>
              <option value={3}>Art</option>
              <option value={4}>Game</option>
              <option value={5}>Conference</option>
              <option value={6}>Expo</option>
              <option value={7}>Community</option>
              <option value={8}>Travel</option>
              <option value={9}>Food</option>
              <option value={10}>Education</option>
              <option value={11}>Job Fair</option>
              <option value={12}>Kids</option>
              <option value={13}>Family</option>
            </Select>
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
                id="date_start"
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
                id="date_end"
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
              id="time_start"
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
              id="time_end"
              type="time"
              placeholder="Time end"
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
              id="vip_ticket_price"
              placeholder="Price for vip"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              className="bg-gray-100 rounded-md p-2 w-96"
              style={{ boxShadow: "1px 2px 4px black" }}
            ></Input>
            <Input
              id="vip_ticket_stock"
              placeholder="Stock ticket for vip"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              className="bg-gray-100 rounded-md p-2 w-96"
              style={{ boxShadow: "1px 2px 4px black" }}
            ></Input>
            <Input
              id="presale_ticket_price"
              placeholder="Price for ticket presale"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              className="bg-gray-100 rounded-md p-2 w-96"
              style={{ boxShadow: "1px 2px 4px black" }}
            ></Input>
            <Input
              id="presale_ticket_stock"
              placeholder="Stock for ticket prisale"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              className="bg-gray-100 rounded-md p-2 w-96"
              style={{ boxShadow: "1px 2px 4px black" }}
            ></Input>
            <Input
              id="normal_ticket_price"
              placeholder="Price for ticket normal"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              className="bg-gray-100 rounded-md p-2 w-96"
              style={{ boxShadow: "1px 2px 4px black" }}
            ></Input>
            <Input
              id="normal_ticket_stock"
              placeholder="Stock for ticket normal"
              mb={"20px"}
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
              className="bg-gray-100 rounded-md p-2 w-96"
              style={{ boxShadow: "1px 2px 4px black" }}
            ></Input>

            <Modal.Footer>
              <Button variant="primary" onClick={closeModal}>
                Close
              </Button>
              <Button variant="success" onClick={formik.handleSubmit}>
                Create
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
