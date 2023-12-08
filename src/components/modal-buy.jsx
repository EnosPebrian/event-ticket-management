import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import api from '../json-server/api';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import uuid from 'react-uuid';
import { useToast } from '@chakra-ui/react';
import { types } from '../redux/types';

export const ModalBuy = (props) => {
  const userSelector = useSelector((state) => state.auth);
  const [events_map, setEvents_map] = useState(new Map());
  const dispatch = useDispatch();
  const nav = useNavigate();
  const toast = useToast();

  const { eventid, eventname } = useParams();

  const fetchEventsMap = async () => {
    try {
      const res_events = await api.get('/events');
      const temp_events_map = new Map();
      res_events.data.map((an_event) =>
        temp_events_map.set(an_event.id, an_event)
      );
      setEvents_map(temp_events_map);
    } catch (err) {
      console.log(err);
    }
  };

  const vipPrice = props.an_event?.vip_ticket_price;

  useEffect(() => {
    fetchEventsMap();
  }, []);
  useEffect(() => {
    fetchEventsMap();
  }, [props]);

  const event_id = Number(eventid);
  const thisevent = events_map.get(event_id);

  const buy = async () => {
    const token = localStorage.getItem('auth');
    try {
      const response = await api.post(
        '/transactions',
        {
          event_id: thisevent.id,
          vip_ticket: true,
          normal_ticket: false,
          presale_ticket: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const pushTicket = await api.post('/tickets', {
        userid: userSelector.id,
        eventid: thisevent.id,
        ticketcode: uuid(),
        category: 1,
        ticket_price: response.data.total_price,
      });
      dispatch({
        type: types.update_saldo,
        payload: { points: userSelector?.points - response.data.total_price },
      });

      // console.log("response", response);
      props.onHide();
    } catch (err) {
      console.log(err);
    }
  };

  // const buy = async () => {
  //   try {
  //     const updatedVIPStock = thisevent.vip_ticket_stock - 1;
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
  //     if (userSelector.points < thisevent.vip_ticket_price)
  //       return toast({
  //         title: "saldo anda tidak cukup",
  //         description: "silahkan isi saldo",
  //         status: "error",
  //         duration: 3000,
  //       });
  //     //update sisa saldo user setelah beli
  //     try {
  //       const sisaSaldo = userSelector.points - thisevent["vip_ticket_price"];
  //       await api.patch(`/users/${userSelector.id}`, {
  //         points: sisaSaldo,
  //       });
  //       await dispatch({
  //         type: types.update_saldo,
  //         payload: { ["points"]: sisaSaldo },
  //       });

  //       // vip_ticket > 0 ? stok vip event berkurang : return taost ticket habis
  //       if (thisevent.vip_ticket_stock <= 0)
  //         return toast({
  //           title: "stok VIP habis",
  //           description: "tiket yang anda pilih habis",
  //           status: "error",
  //           duration: 3000,
  //         });
  //       const response = await api.patch(`/events/${eventid}`, {
  //         vip_ticket_stock: updatedVIPStock,
  //       });
  //       if (response.status === 200) {
  //         dispatch({
  //           type: types.update_vip_ticket_stock,
  //           payload: { eventid, vip_ticket_stock: updatedVIPStock },
  //         });
  //         toast({
  //           title: "berhasil membeli VIP tiket",
  //           status: "success",
  //           duration: 3000,
  //         });
  //         props.onHide();
  //       } else {
  //         console.error("Failed to update ticket stock");
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
          Price of this ticket: Rp
          {vipPrice.toLocaleString(`id-ID`)}
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
          Buy VIP Ticket
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
