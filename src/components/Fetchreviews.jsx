import { Button, Card } from "react-bootstrap";
import api from "../json-server/api";
import { useEffect, useRef, useState } from "react";
import { Review_comment_card } from "./review_comment_card";

function FetchReviews({ eventid }) {
  const [allComment, setAllComment] = useState([]);
  const [reviewPage, setReviewPage] = useState(0);
  const ref = useRef(1);

  const load_review = async (page) => {
    await api.get(`/reviews/context/${eventid}?page=${page}`).then((result) => {
      setAllComment(result.data.data);
      setReviewPage(result.data.number_of_pages);
    });
  };

  useEffect(() => {
    load_review(ref.current);
  }, []);

  const handlePagination = (page) => {
    load_review(page);
  };

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
                <Button
                  variant="secondary"
                  key={index}
                  onClick={() => handlePagination(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
            </Card.Header>
          </Card>
        </Card.Body>
      ) : null}
    </>
  );
}
export default FetchReviews;
