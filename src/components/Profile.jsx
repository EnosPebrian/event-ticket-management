import { Row, Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import api from "../json-server/api";
import HeaderNavbar from "../components/Header-navbar";
import SpinnerLoading from "../components/SpinnerLoading";
import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";
import "./style.css";
import { ModalCreate } from "./modal-create";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Formik, useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import { Ticket } from "./ticket";
import { TicketCardProfilePage } from "./TicketCard_onProfilePage";

export const Profile = () => {
  const nav = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numberOfEvenPosted, setNumberOfEvenPosted] = useState([]);
  const [evenPosted, setEvenPosted] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [ticketPage, setTicketPage] = useState(0);
  const [evenPostedPage, setEvenPostedPage] = useState(0);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // FOR TOP UP
  const topup = () => {
    nav("/dashboardprofile/topup");
  };

  const userSelector = useSelector((state) => state.auth);

  const fetchPostedEvents = async () => {
    try {
      const res = await api.get(
        `/events/q?event_creator_userid=${userSelector.id}`
      );
      setNumberOfEvenPosted(res.data.data.length);
      setEvenPosted(res.data.data);
      setEvenPostedPage(res.data.number_of_pages);
    } catch (error) {
      console.log(error);
    }
  };

  const getTicket = async () => {
    try {
      const resTicket = await api.get(`/tickets/q?userid=${""}}`);
      setTickets(resTicket.data.data);
      setTicketPage(resTicket.data.number_of_pages);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(evenPosted, "ini eventpost");
  useEffect(() => {
    fetchPostedEvents();
    getTicket();
  }, [userSelector.id]);

  return (
    <div
      style={{
        backgroundColor: "#eee",
        display: "flex",
        justifyContent: "space-between  ",
      }}
    >
      <MDBContainer className=" py-5">
        <MDBRow
          className="space-x-0"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <MDBCard
            style={{
              borderRadius: "15px",
              maxWidth: "600px",
              boxShadow: "2px 3px 5px black",
              marginBottom: "8px",
            }}
          >
            <MDBCardBody className="text-center">
              <div className="mt-3 mb-4 d-flex justify-content-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                  className="rounded-circle"
                  fluid
                  style={{ width: "100px" }}
                />
              </div>
              <MDBTypography tag="h4">
                Welcome, {userSelector.username}
              </MDBTypography>
              <MDBCardText className="text-muted mb-4">
                <a href="#!">Ref: {userSelector.referralcode}</a>
              </MDBCardText>
              <div className="mb-4 pb-2"></div>
              <Button onClick={topup}>Topup Saldo</Button>
              <div className="d-flex justify-content-between text-center mt-5 mb-2">
                <div>
                  <MDBCardText className="mb-1 h5">
                    Rp{Number(userSelector.points).toLocaleString(`id-ID`)}
                    ,00
                  </MDBCardText>
                  <MDBCardText className="small text-muted mb-0">
                    Wallets Balance
                  </MDBCardText>
                </div>
                <div className="px-3">
                  <MDBCardText className="mb-1 h5">
                    {numberOfEvenPosted}
                  </MDBCardText>
                  <MDBCardText className="small text-muted mb-0">
                    Event you create
                  </MDBCardText>
                </div>
                <div>
                  <MDBCardText className="mb-1 h5">4751</MDBCardText>
                  <MDBCardText className="small text-muted mb-0">
                    Total Transactions
                  </MDBCardText>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBRow>
        <MDBRow>
          <Tabs
            defaultActiveKey="createdEvent"
            id="uncontrolled-tab-example"
            className="mb-3 d-flex justify-content-center"
          >
            <Tab
              eventKey="createdEvent"
              title="Event You Created"
              className="center"
            >
              <Row className="w-100 d-flex justify-content-center gap-1">
                {evenPosted?.map((aPostedEvent, index) => (
                  <TicketCardProfilePage
                    eve={aPostedEvent}
                    index={index}
                    fetchPostedEvents={fetchPostedEvents}
                  />
                ))}
              </Row>
            </Tab>
            <Tab eventKey="tickets" title="Your Tickets">
              <Row className="w-100 d-flex justify-content-center gap-1">
                {tickets.map((ticket, index) => (
                  <Ticket ticket={ticket} index={index} getTicket={getTicket} />
                ))}
              </Row>
            </Tab>
            <Tab eventKey="createevent" title="Create Event">
              <div className="w-100 d-flex justify-content-center">
                <button
                  onClick={openModal}
                  className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded :"
                >
                  Create Event
                </button>
              </div>
            </Tab>
          </Tabs>

          <ModalCreate
            openModal={openModal}
            setIsModalOpen={setIsModalOpen}
            closeModal={closeModal}
            isModalOpen={isModalOpen}
            fetchPostedEvents={fetchPostedEvents}
          />
        </MDBRow>
      </MDBContainer>
    </div>
  );
};
