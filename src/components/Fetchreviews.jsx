import { Button, Card, Form, Spinner } from "react-bootstrap";
import api from "../json-server/api";
import { useEffect, useState } from "react";

function FetchReviews({ eventid, users_map, events_map }) {
  const [commentscontainer, setCommentscontainer] = useState([]);
  const [allComment, setAllComment] = useState([]);
  const [activitycounter, setActivitycounter] = useState(0);
  const userid = JSON.parse(localStorage.getItem("auth")).id;
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [newcomment, setNewcomment] = useState({
    id: 0,
    eventid: 0,
    comments: [],
    userid: [],
    ratings: [],
  });
  const load_review = async () => {
    const res = await api.get(`reviews`);
    const thiseventreview = [...res.data];
    const temp_fil = thiseventreview.filter((rev) => rev.eventid == eventid)[0];
    setAllComment(temp_fil);
    const temp = [];
    if (temp_fil) {
      for (let i = 0; i < temp_fil.comments.length; i++) {
        temp.push([
          temp_fil.userid[i],
          temp_fil.comments[i],
          temp_fil.ratings[i],
        ]);
      }
    }
    setCommentscontainer(temp);
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
    setNewcomment({
      id: allComment.id,
      eventid: { eventid },
      comments: [
        ...allComment?.comments,
        document.getElementById("addcomment").value,
      ],
      userid: [...allComment?.userid, userid],
      ratings: [...allComment?.ratings, rating],
    });
    await api.patch(`/reviews/${allComment.id}`).then(load_review());
  };

  useEffect(() => {
    load_review();
  }, []);

  useEffect(() => {
    load_review();
  }, [activitycounter]);

  return (
    <>
      {commentscontainer.length ? (
        commentscontainer.map((comment, index) => (
          <Card key={index}>
            <div className="px-3">
              <span>Ratings: {Stars(comment[2])}</span>
              <span className="d-flex flex-row" style={{ gap: "5px" }}>
                <span className="pt-1">
                  <Card.Img
                    src="https://static.thenounproject.com/png/5034901-200.png"
                    style={{ maxWidth: "20px", maxHeight: "20px" }}
                  />
                </span>
                {users_map.size ? (
                  users_map.get(comment[0])?.username
                ) : (
                  <Spinner />
                )}
              </span>
            </div>
            <Card.Body className="bg-light px-3">{comment[1]}</Card.Body>
          </Card>
        ))
      ) : (
        <span>This event has no review / comment</span>
      )}
      <Card.Body>
        <Card className="p-3">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <b>Add your reviews/comments here</b>
              </Form.Label>
              <Form.Control
                id="addcomment"
                type="text"
                placeholder="Write your comments"
              />
              <Form.Text className="text-muted">
                Ratings: <StarRating />
              </Form.Text>
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
