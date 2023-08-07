import { Button, Card, Form, Spinner } from "react-bootstrap";
import api from "../json-server/api";
import { useEffect, useState } from "react";

function FetchReviews({ eventid, users_map, events_map }) {
  const [commentscontainer, setCommentscontainer] = useState([]);
  const [activitycounter, setActivitycounter] = useState(0);
  const load_review = async () => {
    const res = await api.get(`reviews`);
    const thiseventreview = [...res.data];
    const temp_fil = thiseventreview.filter((rev) => rev.eventid == eventid)[0];
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
                  users_map.get(comment[0])["username"]
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
