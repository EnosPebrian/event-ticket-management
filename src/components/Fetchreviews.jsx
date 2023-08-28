import { Button, Card, Form, Spinner } from "react-bootstrap";
import api from "../json-server/api";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Review_comment_card } from "./review_comment_card";

function FetchReviews({ eventid }) {
  const [allComment, setAllComment] = useState([]);
  const [reviewPage, setReviewPage] = useState(0);

  const navigate = useNavigate();
  const [newcomment, setNewcomment] = useState({
    id: 0,
    eventid: 0,
    comments: [],
    userid: [],
    ratings: [],
  });
  const userSelector = useSelector((state) => state.auth);
  let userid;
  try {
    userid = JSON.parse(localStorage.getItem("auth")).id;
  } catch (err) {
    console.log(err);
  }

  const load_review = async () => {
    await api.get(`/reviews/context/${eventid}`).then((result) => {
      setAllComment(result.data.data);
      setReviewPage(result.data.number_of_pages);
    });
  };
  useEffect(() => {
    load_review();
  }, []);

  // const submitNewComment = async () => {
  //   if (!userid) return navigate(`/login`);
  //   if (rating == 0) return alert(`please add a rating`);
  //   if (document.getElementById("ticketcode").value === "") {
  //     return alert(`please input your ticket code`);
  //   } else {
  //     const res_code = await api.get(
  //       `tickets?ticketCode=${document.getElementById("ticketcode").value}`
  //     );
  //     const code = res_code.data[0];
  //     console.log(userid, code);
  //     if (!code?.ticketCode) return alert(`wrong ticket code`);
  //     if (userid != code?.userid)
  //       return alert(`You are not attending this event`);
  //   }
  //   setNewcomment({
  //     id: eventid,
  //     eventid: eventid,
  //     comments: [
  //       ...allComment?.comments,
  //       document.getElementById("addcomment").value,
  //     ],
  //     userid: [...allComment?.userid, userid],
  //     ratings: [...allComment?.ratings, rating],
  //   });
  //   await api
  //     .patch(`/reviews/${eventid}`, newcomment)
  //     .then(() => load_review());
  // };

  useEffect(() => {
    load_review();
  }, []);

  return (
    <>
      <Card.Body style={{ overflowY: "scroll", maxHeight: "100vh" }}>
        {allComment.length ? (
          allComment.map((comment, index) => (
            <Review_comment_card comment={comment} index={index} />
          ))
        ) : (
          <span>This event has no review / comment</span>
        )}
      </Card.Body>
      {reviewPage > 1 ? (
        <Card.Body>
          <Card className="p-3">
            <Card.Header>
              Page:{" "}
              {[...Array(reviewPage)].map((value, index) => (
                <Button variant="secondary">{index + 1}</Button>
              ))}
            </Card.Header>
          </Card>
        </Card.Body>
      ) : null}
    </>
  );
}
export default FetchReviews;
