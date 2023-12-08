import { Button, Card, Spinner } from 'react-bootstrap';
import timeDisplayer from '../lib/time-displayer';
import { SVGthreeDots } from './SVG';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import api from '../json-server/api';
import { useToast } from '@chakra-ui/react';

export const Review_comment_card = ({ comment, index, load_review, page }) => {
  const userSelector = useSelector((state) => state.auth);
  const [menu, setMenu] = useState(false);
  const toast = useToast();

  const deleteReview = async () => {
    await api
      .delete(`/reviews/${comment.id}`, { data: { userid: userSelector.id } })
      .then((result) => {
        toast({
          title: 'success',
          duration: 2000,
          status: 'success',
          isClosable: true,
          position: 'top',
          description: result?.data?.message,
        });
      })
      .catch((err) =>
        toast({
          title: 'error',
          duration: 2000,
          status: 'error',
          isClosable: true,
          position: 'top',
          description: err?.response?.data,
        })
      );
    load_review(page);
    setMenu(!menu);
  };

  return (
    <Card key={`cardReview-` + index} style={{ position: 'relative' }}>
      {userSelector?.role === 1 ? (
        <span
          type="button"
          style={{ position: 'absolute', right: '5px', top: '5px' }}
        >
          <div
            onClick={() => setMenu(!menu)}
            className="d-flex justify-content-end"
          >
            <SVGthreeDots />
          </div>
          <Button
            className={menu ? 'd-inline' : 'd-none'}
            onClick={deleteReview}
          >
            delete
          </Button>
        </span>
      ) : null}
      <div className="px-3">
        <span>
          Ratings: <Stars value={comment?.ratings} />
        </span>
        <span className="d-flex flex-row" style={{ gap: '5px' }}>
          <span className="pt-1">
            <Card.Img
              src="https://static.thenounproject.com/png/5034901-200.png"
              style={{ maxWidth: '20px', maxHeight: '20px' }}
            />
          </span>
          {comment?.User.username ? comment?.User.username : <Spinner />}
          <small className="w-100 text-end">
            {timeDisplayer(comment?.timediff, comment?.createdAt)}
          </small>
        </span>
      </div>
      <Card.Body className="bg-light px-3">{comment?.comments}</Card.Body>
    </Card>
  );
};

function Stars({ value }) {
  const temp = [];
  for (let i = 0; i < value; i++) {
    temp.push(
      <span
        key={`fafastarchecked-${i}`}
        className="fa fa-star star-checked"
      ></span>
    );
  }
  for (let i = 0; i < 5 - value; i++) {
    temp.push(<span key={`fafastar-${i}`} className="fa fa-star"></span>);
  }
  return temp;
}
