import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import api from "../json-server/api";
import { useFormik } from "formik";
import * as Yup from "yup";

export const EditReviewAnEvent = ({
  show,
  handleClose,
  ticket,
  index,
  getTicket,
}) => {
  const toast = useToast();
  const [rating, setRating] = useState(ticket?.Review?.ratings);
  const [hover, setHover] = useState(0);
  function StarRating() {
    return (
      <span className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <Button
              key={index}
              style={{
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                cursor: "pointer",
                padding: "0",
              }}
              className={index <= (hover || rating) ? "on" : "off"}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className={index <= (hover || rating) ? "on" : "off"}>
                &#9733;
              </span>
            </Button>
          );
        })}
      </span>
    );
  }
  const formik = useFormik({
    initialValues: {
      eventid: ticket?.eventid,
      userid: ticket?.userid,
      ticketcode: ticket?.ticketcode,
      ratings: ticket?.Review?.ratings,
      comments: ticket?.Review?.comments,
      show_name: ticket?.Review?.show_name,
    },
    validationSchema: Yup.object().shape({
      comments: Yup.string().required(),
      show_name: Yup.boolean(),
    }),
    onSubmit: async (values) => {
      values.ratings = rating;
      if (values.ratings === 0 || values.comments === "") {
        return toast({
          status: "error",
          title: "Submission failed",
          description: "You must fill rating and comment text",
          isClosable: "true",
        });
      }
      await api
        .patch(`/reviews/${ticket?.Review?.id}`, values)
        .then(() => {
          setRating(0);
          setHover(0);
          getTicket();
          handleClose();
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <>
      <Modal show={show === "modalEdit"} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3 d-flex flex-column">
              <Form.Label>
                <b>Add your reviews/comments here</b>
              </Form.Label>
              <Form.Control
                id={`addcomment-${index}`}
                name="comments"
                onChange={formik.handleChange}
                value={formik.values.comments}
                as="textarea"
                placeholder="Write your comments"
              />
              <Form.Text className="text-muted mt-3">
                Rating: <StarRating /> 0-Very Bad --- 5-Excellent
              </Form.Text>
              <Form.Text className="mt-3">
                <input
                  type="checkbox"
                  name="show_name"
                  value={formik.values.show_name}
                  className="mr-2"
                  onChange={formik.handleChange}
                />
                Show your name?
              </Form.Text>
              <Button
                className="mt-3"
                style={{ float: "right" }}
                variant="secondary"
                onClick={formik.handleSubmit}
              >
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
