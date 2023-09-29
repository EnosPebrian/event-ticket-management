import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import api from "../json-server/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";
import { types } from "../redux/types";
import uuid from "react-uuid";
import { useToast } from "@chakra-ui/react";

export const ModalBuyPresale = (props) => {
  const userSelector = useSelector((state) => state.auth);
  const [events_map, setEvents_map] = useState(new Map());
  const dispatch = useDispatch();
  const nav = useNavigate();
  const toast = useToast();

  const { eventid, eventname } = useParams();

  const fetchEventsMap = async () => {
    try {
      const res_events = await api.get("/events");
      const temp_events_map = new Map();
      res_events.data.map((an_event) =>
        temp_events_map.set(an_event.id, an_event)
      );
      setEvents_map(temp_events_map);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEventsMap();
  }, []);
  useEffect(() => {
    fetchEventsMap();
  }, [props]);

  const event_id = Number(eventid);
  const thisevent = events_map.get(event_id);

  // console.log(thisevent["vip-ticket-stock"]);

  const buy = async () => {
    const token = localStorage.getItem("auth");
    try {
      const response = await api.post(
        "/transactions",
        {
          event_id: thisevent.id,
          vip_ticket: false,
          normal_ticket: false,
          presale_ticket: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("response", response.data);
      props.onHide();
    } catch (err) {
      console.log(err);
    }
  };

  // const buy = async () => {
  //   try {
  //     const updatedPresaleStock = thisevent.presale_ticket_stock - 1;
  //     const isUserLogin = localStorage.getItem("auth");

  //     //cek apakah user sudah login
  //     if (!isUserLogin)
  //       return toast({
  //         title: "anda belum login",
  //         description: "anda harus login terlebih dahulu",
  //         status: "error",
  //         duration: 3000,
  //       });
  //     // kalo sudah login cek apakah saldo cukup
  //     if (userSelector.points < thisevent.presale_ticket_price)
  //       return toast({
  //         title: "saldo anda tidak cukup",
  //         description: "silahkan isi saldo",
  //         status: "error",
  //         duration: 3000,
  //       });
  //     //update sisa saldo user setelah beli
  //     try {
  //       const sisaSaldo =
  //         userSelector.points - thisevent["presale_ticket_price"];
  //       await api.patch(`/users/${userSelector.id}`, {
  //         points: sisaSaldo,
  //       });
  //       await dispatch({
  //         type: types.update_saldo,
  //         payload: { ["points"]: sisaSaldo },
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }

  //     // presale_ticket > 0 ? stok presale event berkurang : return taost ticket habis
  //     if (thisevent.presale_ticket_stock <= 0)
  //       return toast({
  //         title: "stok Presale habis",
  //         description: "tiket yang anda pilih habis",
  //         status: "error",
  //         duration: 3000,
  //       });
  //     const response = await api.patch(`/events/${eventid}`, {
  //       presale_ticket_stock: updatedPresaleStock,
  //     });
  //     if (response.status === 200) {
  //       dispatch({
  //         type: types.update_presale_ticket_stock,
  //         payload: { eventid, presale_ticket_stock: updatedPresaleStock },
  //       });
  //       toast({
  //         title: "berhasil membeli VIP tiket",
  //         status: "success",
  //         duration: 3000,
  //       });

  //       /* Close the modal or perform any other actions as needed
  //       For example, you can navigate to a success page */
  //       props.onHide();
  //     } else {
  //       /* Handle the case when the update request fails */
  //       console.error("Failed to update ticket stock");
  //     }

  //     //proteksi apabila user tidak login tapi mau beli
  //     /*   if (!isUserLogin)
  //       return toast({
  //         title: "anda belum login",
  //         description: "anda harus login terlebih dahulu",
  //         status: "error",
  //         duration: 3000,
  //       }); */
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const PresalePrice = props.an_event?.presale_ticket_price;

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
        <div>
          Price of this ticket: Rp.
          {PresalePrice.toLocaleString(`id-ID`)}
          ,00
        </div>
        <div>
          Your Balance: Rp.{Number(userSelector.points).toLocaleString(`id-ID`)}
          ,00
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="secondary">
          Close
        </Button>
        <Button variant="primary" onClick={buy}>
          Buy Presale Ticket
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
