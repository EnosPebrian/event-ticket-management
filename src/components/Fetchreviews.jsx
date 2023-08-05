import { Card } from "react-bootstrap";
import api from "../json-server/api";
import { useEffect, useState } from "react";
import { async } from "q";

function FetchReviews({ eventid }) {
  const [comments, setComments] = useState([]);
  const load_review = async () => {
    const res = await api.get(`reviews`);
    return res.data;
  };

  useEffect(() => {
    setComments([...load_review()]);
  }, []);

  useEffect(() => {
    setComments([...load_review()]);
  }, [comments]);

  return (
    <>
      {/* rating */}
      <Card>
        <Card.Body>This is some text within a card body.</Card.Body>
      </Card>
      {/* avatar - nama orang */}
      {/* comment */}
    </>
  );
}

export default FetchReviews;
