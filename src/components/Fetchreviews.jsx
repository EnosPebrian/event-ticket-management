import { Button, Card, Form, Spinner } from "react-bootstrap";
import api from "../json-server/api";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function FetchReviews({ eventid, users_map, events_map }) {
  const [commentscontainer, setCommentscontainer] = useState([]);
  const [allComment, setAllComment] = useState([]);
  const [activitycounter, setActivitycounter] = useState(0);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const navigate = useNavigate();
  const [newcomment, setNewcomment] = useState({
    id: 0,
    eventid: 0,
    comments: [],
    userid: [],
    ratings: [],
  });
  let userid;

  const userSelector = useSelector((state) => state.auth);
  // useEffect(() => console.log(`userselector detailpage`, userSelector));

  try {
    userid = JSON.parse(localStorage.getItem("auth")).id;
  } catch (err) {
    console.log(err);
  }

  const load_review = async () => {
    let res = await api.get(`reviews?eventid=${eventid}`);
    let temp_fil = res.data[0];
    if (!temp_fil) {
      try {
        await api
          .post(`reviews`, {
            id: eventid,
            eventid: eventid,
            comments: [],
            userid: [],
            ratings: [],
          })
          .then(async () => {
            res = await api.get(`reviews?eventid=${eventid}`);
            temp_fil = res.data[0];
            setAllComment({
              id: eventid,
              eventid: eventid,
              comments: [],
              userid: [],
              ratings: [],
            });
          });
      } catch (err) {
        console.log(err);
      }
    } else setAllComment(temp_fil);
  };

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

  const submitNewComment = async () => {
    if (!userid) return navigate(`/login`);
    if (rating == 0) return alert(`please add a rating`);
    if (document.getElementById("ticketcode").value === "") {
      return alert(`please input your ticket code`);
    } else {
      const res_code = await api.get(
        `tickets?ticketCode=${document.getElementById("ticketcode").value}`
      );
      // console.log(res_code);
      const code = res_code.data[0];
      console.log(userid, code);
      if (!code?.ticketCode) return alert(`wrong ticket code`);
      if (userid != code?.userid)
        return alert(`You are not attending this event`);
    }
    setNewcomment({
      id: eventid,
      eventid: eventid,
      comments: [
        ...allComment?.comments,
        document.getElementById("addcomment").value,
      ],
      userid: [...allComment?.userid, userid],
      ratings: [...allComment?.ratings, rating],
    });
    await api
      .patch(`/reviews/${eventid}`, newcomment)
      .then(() => load_review());
    const tmp = activitycounter;
    setActivitycounter(tmp + 1);
  };

  useEffect(() => {
    load_review();
  }, []);

  useEffect(() => {
    load_review();
  }, [activitycounter]);

  return (
    <>
      <Card.Body style={{ overflowY: "scroll", maxHeight: "100vh" }}>
        {allComment.id ? (
          allComment?.comments.map((comment, index) => (
            <Card key={index}>
              <div className="px-3">
                <span>Ratings: {Stars(allComment?.ratings[index])}</span>
                <span className="d-flex flex-row" style={{ gap: "5px" }}>
                  <span className="pt-1">
                    <Card.Img
                      src="https://static.thenounproject.com/png/5034901-200.png"
                      style={{ maxWidth: "20px", maxHeight: "20px" }}
                    />
                  </span>
                  {users_map.size ? (
                    users_map.get(allComment?.userid[index])?.username
                  ) : (
                    <Spinner />
                  )}
                </span>
              </div>
              <Card.Body className="bg-light px-3">{comment}</Card.Body>
            </Card>
          ))
        ) : (
          <span>This event has no review / comment</span>
        )}
      </Card.Body>
      <Card.Body>
        <Card className="p-3">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Add your reviews/comments here</b>
              </Form.Label>
              <Form.Control
                id="addcomment"
                name="addcomment"
                type="text"
                placeholder="Write your comments"
              />
              <Form.Text className="text-muted">
                Ratings: <StarRating required />
              </Form.Text>
              <Form.Control
                id="ticketcode"
                name="ticketcode"
                type="text"
                placeholder="Input your ticket code"
              />
              <Button
                className="mt-2"
                style={{ float: "right" }}
                variant="secondary"
                onClick={submitNewComment}
              >
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Card>
      </Card.Body>
    </>
  );
}
export default FetchReviews;

function Stars(value) {
  const temp = [];
  for (let i = 0; i < value; i++) {
    temp.push(<span class="fa fa-star star-checked"></span>);
  }
  for (let i = 0; i < 5 - value; i++) {
    temp.push(<span class="fa fa-star"></span>);
  }
  return temp;
}
