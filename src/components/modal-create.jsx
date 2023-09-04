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
import { useSelector } from "react-redux";
import { Select } from "@chakra-ui/react";

export const ModalCreate = ({
  isModalOpen,
  setIsModalOpen,
  openModal,
  closeModal,
  fetchEven,
  fetchEvents,
}) => {
  // let userProfile;
  // let userid;
  // console.log("user profile", userid);

  // try {
  //   userProfile = JSON.parse(localStorage.getItem("auth"));
  //   userid = userProfile.id;
  // } catch (err) {
  //   console.log(err);
  // }

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
    },
    onSubmit: async (values) => {
      const temp = { ...values };

      // console.log("ghalo", values["description"], values["category"]);
      // if (temp["vip-ticket-price"] && temp["presale-ticket-price"]) {
      //   temp["isfree"] = 0;
      // }
      console.log("terkirim dongggggg");
      await api.post("/events/create", temp);
      // closeModal();
      // fetchEvents();

      // const res_this_event = await api.get(
      //   `/events?name=${temp.name}&location=${temp.location}&venue=${temp.venue}`
      // );
      // console.log(`1`, res_this_event);
      // const eventid = res_this_event.data[0].id;
      // const res_user = await api.get(`users/${userSelector.id}`);
      // const datauser = res_user.data;
      // datauser.events.push(eventid);
      // await api.patch(`users/${datauser.id}`, datauser);
      // fetchEven();
      // fetchEvents();
      // closeModal();
    },

    // validationSchema: yup.object().shape({
    //   name: yup.string().required(),
    //   date_start: yup.string().required(),
    //   date_end: yup.string().required(),
    //   time_start: yup.string().required(),
    //   time_end: yup.string().required(),
    // }),
  });
  const [location, setLocation] = useState([]);

  const fetchLocationForSelectOption = async () => {
    await api.get("/locations/").then((result) => setLocation(result.data));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        document.getElementById("img-default").src = reader.result;
        formik.setFieldValue("url", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // console.log(formik.values.category);
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
            <img
              id="img-default"
              src={imageDefault}
              className="mb-8 object-fill"
              style={{ boxShadow: "1px 2px 4px black" }}
              cursor={"pointer"}
            ></img>
            <input
              type="file"
              accept="image/*"
              id="url"
              placeholder="Image"
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

            <Select
              placeholder="Select  or type location"
              className="bg-gray-100 rounded-md p-2 w-96 mb-3"
              style={{ boxShadow: "1px 2px 4px black" }}
              id="location"
              value={formik.values.location}
              onChange={(e) => formik.setFieldValue("location", e.target.value)}
            >
              {location.map((name) => (
                <>
                  <option value={name?.id}>{name?.location_name}</option>
                </>
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
