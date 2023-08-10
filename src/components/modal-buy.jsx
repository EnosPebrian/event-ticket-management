import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import api from "../json-server/api";

export const ModalBuy = (props) => {
  const userSelector = useSelector((state) => state.auth);
  console.log(userSelector);

  const hargaEvent = async () => {
    await api.get("/events");
  };
  console.log(hargaEvent);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Are you sure want to buy this ticket?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>Price of this ticket:</div>
        <div>Your Balance: {userSelector.points}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="secondary">
          Close
        </Button>
        <Button onClick={props.onHide} variant="primary">
          Buy VIP Ticket
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// function App() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }

// render(<App />);
