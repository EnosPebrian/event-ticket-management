import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import api from "../json-server/api";

export const ReviewAnEvent = ({
  show,
  handleClose,
  ticket,
  index,
  getTicket,
}) => {
  const toast = useToast();
  const [rating, setRating] = useState(0);
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
  const postReview = async () => {
    const data = {
      eventid: ticket.eventid,
      userid: ticket.userid,
      ticketcode: ticket.ticketcode,
      ratings: rating,
      comments: document.getElementById(`addcomment-${index}`).value,
      show_name: document.getElementsByName(`show_name`)[0].checked,
    };
    if (data.ratings === 0 || data.comments === "") {
      return toast({
        status: "error",
        title: "Submission failed",
        description: "You must fill rating and comment text",
        isClosable: "true",
      });
    }
    try {
      await api.post(`/reviews`, data);
      setRating(0);
      setHover(0);
      getTicket();
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Modal show={show === "modalReview"} onHide={handleClose}>
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
                name="addcomment"
                as="textarea"
                placeholder="Write your comments"
              />
              <Form.Text className="text-muted mt-3">
                Rating: <StarRating /> 0-Very Bad --- 5-Excellent
              </Form.Text>
              <Form.Text className="mt-3">
                <input type="checkbox" name="show_name" className="mr-2" />
                Show your name?
              </Form.Text>
              <Button
                className="mt-3"
                style={{ float: "right" }}
                variant="secondary"
                onClick={postReview}
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
