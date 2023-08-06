import { Card, Form, Spinner } from "react-bootstrap";
import api from "../json-server/api";
import { useEffect, useState } from "react";
import { AspectRatio } from "@chakra-ui/react";

function FetchReviews({ eventid, users_map, events_map }) {
  const [commentscontainer, setCommentscontainer] = useState([]);
  const [activitycounter, setActivitycounter] = useState(0);
  const load_review = async () => {
    const res = await api.get(`reviews`);
    const thiseventreview = [...res.data];
    const temp_fil = thiseventreview.filter((rev) => rev.eventid == eventid)[0];
    const temp = [];
    for (let i = 0; i < temp_fil.comments.length; i++) {
      temp.push([
        temp_fil.userid[i],
        temp_fil.comments[i],
        temp_fil.ratings[i],
      ]);
    }
    setCommentscontainer(temp);
  };

  useEffect(() => {
    load_review();
  }, []);

  useEffect(() => {
    load_review();
  }, [activitycounter]);

  return (
    <>
      {commentscontainer.length &&
        commentscontainer.map((comment) => (
          <Card className="px-2">
            <span>Ratings: {Stars(comment[2])}</span>
            <span className="d-flex flex-row" style={{ gap: "5px" }}>
              <span className="pt-1">
                <Card.Img
                  src="https://static.thenounproject.com/png/5034901-200.png"
                  style={{ maxWidth: "20px", maxHeight: "20px" }}
                />
              </span>
              {users_map.size ? (
                users_map.get(comment[0])["username"]
              ) : (
                <Spinner />
              )}
            </span>
            <Card.Body>{comment[1]}</Card.Body>
          </Card>
        ))}
      <Card>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
        </Form>
      </Card>
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
