import { Card, Spinner } from "react-bootstrap";

export const Review_comment_card = ({ comment, index }) => {
  return (
    <Card key={index}>
      <div className="px-3">
        <span>Ratings: {Stars(comment?.ratings)}</span>
        <span className="d-flex flex-row" style={{ gap: "5px" }}>
          <span className="pt-1">
            <Card.Img
              src="https://static.thenounproject.com/png/5034901-200.png"
              style={{ maxWidth: "20px", maxHeight: "20px" }}
            />
          </span>
          {comment?.User.username ? comment?.User.username : <Spinner />}
        </span>
      </div>
      <Card.Body className="bg-light px-3">{comment?.comments}</Card.Body>
    </Card>
  );
};

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
