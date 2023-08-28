import { Card, Carousel, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import api from "../json-server/api";
import HeaderNavbar from "../components/Header-navbar";
import SpinnerLoading from "../components/SpinnerLoading";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import "./style.css";
import { ModalCreate } from "./modal-create";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Formik, useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

import userEvent from "@testing-library/user-event";
import uuid from "react-uuid";
import { Ticket } from "./ticket";
import { Flex, useToast } from "@chakra-ui/react";

export const Profile = () => {
  const nav = useNavigate();
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [even, setEven] = useState([]);
  const ticketNumber = uuid();
  const [tickets, setTickets] = useState([]);

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
  const userSelectorLocal = JSON.parse(localStorage.getItem("auth"));
  const userid = userSelector.id;

  const fetctEvents = async () => {
    try {
      let eventAmount;
      const eventCreator = await api.get(`/events?event-creator=${userid}`);
      eventAmount = eventCreator.data;
      setEvents(eventAmount.length);
    } catch (error) {
      console.log(error);
    }
  };
  const fetctEven = async () => {
    try {
      let eventAmount;
      const eventCreator = await api.get(`/events?event-creator=${userid}`);
      eventAmount = eventCreator.data;
      setEven(eventAmount);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("Ini event leng", event);
  // get ticket data
  const getTicket = async () => {
    try {
      const resTicket = await api.get(
        `/tickets?userid=${userSelectorLocal.id}`
      );
      setTickets(resTicket.data);
    } catch (error) {
      console.log(error);
    }
  };

  async function deleteEvent(ev) {
    const today = new Date().toISOString().split("T")[0];

    if (
      window.confirm(`are you sure want to delete this event and its record?`)
    ) {
      if (ev["date-start"] > today) {
        if (window.confirm(`there might be several people buy tickets`)) {
          const res = await api.get(`tickets?eventid=${ev.id}`);
          const all_ticket = [...res.data];
          if (all_ticket.length) {
            for (let item of all_ticket) {
              const res_user = await api.get(`users/${item.userid}`);
              const this_user = res_user.data;
              // console.log(`this_user 1`, this_user);
              const temp_points = this_user.points;
              this_user.points = temp_points + item.ticketPrice;
              // console.log(`this_user 2`, this_user);
              await api.patch(`users/${item.userid}`, this_user);
              const a = await api.delete(`tickets/${item.id}`);
              alert(
                `successfully retrieving ${this_user.name} credits from ${temp_points} to ${this_user.points}`
              );
            }
          }
          await api.delete(`events/${ev.id}`);
          fetctEvents();
        }
      } else {
        await api.delete(`events/${ev.id}`);
        fetctEvents();
      }
    }
    fetctEven();
  }

  const ticketDetail = () => {
    nav("/ticket");
  };

  useEffect(() => {
    console.log(userSelector, "e");
    fetctEvents();
    getTicket();
    fetctEven();
  }, [userSelector, events]);

  return (
    <div
      className="vh-100"
      style={{
        backgroundColor: "#eee",
        display: "flex",
        justifyContent: "space-between  ",
      }}
    >
      <MDBContainer
        className="container py-5 h-100"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {
          <MDBRow
            className="space-x-0"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <MDBCol
              md="12"
              xl="4"
              style={{
                width: "600px",
              }}
              className="card atas"
            >
              <MDBCard style={{ borderRadius: "15px" }} className="mt-8">
                <MDBCardBody className="text-center">
                  <div className="mt-3 mb-4 flex justify-center">
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      className="rounded-circle"
                      fluid
                      style={{ width: "100px" }}
                    />
                  </div>
                  <MDBTypography tag="h4">
                    {userSelector.username}
                  </MDBTypography>
                  <MDBCardText className="text-muted mb-4">
                    <a href="#!">Ref: {userSelector.referralcode}</a>
                  </MDBCardText>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    className="mt-10"
                  >
                    <div></div>
                    <button
                      onClick={topup}
                      className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded :"
                    >
                      Topup Saldo
                    </button>
                    <button
                      onClick={openModal}
                      className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded :"
                    >
                      Create Event
                    </button>
                    <div></div>
                  </div>

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
                      <MDBCardText className="mb-1 h5">{events}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Event you create
                      </MDBCardText>
                    </div>
                    <div>
                      <MDBCardText className="mb-1 h5">
                        {tickets.length}
                      </MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Total Transactions
                      </MDBCardText>
                    </div>
                  </div>
                </MDBCardBody>

                {/*   <MDBCardBody
                  className="text-center"
                  id="card bawah"
                  style={{ border: "1px solid" }}
                >
                  <MDBCardText className="mb-1 h5">Your Tickets:</MDBCardText>
                  <div className="mb-4 pb-2 border-2 w-30 h-32">
                    <img src="" alt="img ticket" />
                  </div>
                  <div className="d-flex justify-around text-center mt-2 mb-2">
                    <div>
                      <MDBCardText className="small text-muted mb-0">
                        Event Name:
                      </MDBCardText>
                      <MDBCardText className="mb-1 h5">
                        Event Name here()
                      </MDBCardText>
                    </div>
                    <div>
                      <MDBCardText className="small text-muted mb-0">
                        Event Date:
                      </MDBCardText>
                      <MDBCardText className="mb-1 h5">
                        Event Date here()
                      </MDBCardText>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between text-center mt-3 pt-3">
                    Your Ticket Number: &emsp; {ticketNumber}
                  </div>
                  <Button onClick={ticketDetail}>get Ticket Details</Button>
                </MDBCardBody> */}
              </MDBCard>
              <div className="mb-5 grid grid-cols-3  gap-3 mt-5 flex justify-center">
                {tickets.map((ticket) => (
                  <Ticket ticket={ticket} />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {even?.map((eve) => {
                  return (
                    <Card
                      style={{
                        maxWidth: "18rem",
                        boxShadow: "1px 2px 5px black",
                      }}
                    >
                      <div className="text-center font-bold text-xl p-2 border-b-2">
                        Even you created
                      </div>
                      <Card.Img
                        variant="top"
                        src={eve.photo}
                        style={{
                          maxWidth: "100%",
                          aspectRatio: "2/1",
                          objectFit: "fill",
                        }}
                      />
                      {console.log(eve)}
                      <Card.Body>
                        <Card.Title>{eve.name}</Card.Title>
                        <Card.Text>{eve.location}</Card.Text>
                        <Card.Text>{eve["date-start"]}</Card.Text>
                        <div
                          className="flex"
                          style={{ justifyContent: "space-between" }}
                        >
                          <button
                            rel="stylesheet"
                            onClick={() =>
                              nav(`/${eve.id}/edit_event/${eve.name}`)
                            }
                            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded :"
                          >
                            Edit Event
                          </button>
                          <button
                            fetchEvents={fetctEvents}
                            onClick={() => {
                              deleteEvent(eve);
                            }}
                            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-2 border-b-4 border-red-700 hover:border-red-500 rounded :"
                          >
                            Delete Event
                          </button>
                        </div>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
              <div
                style={{ marginTop: "20px", justifyContent: "space-between" }}
                className="flex "
              ></div>
            </MDBCol>

            <ModalCreate
              openModal={openModal}
              setIsModalOpen={setIsModalOpen}
              closeModal={closeModal}
              isModalOpen={isModalOpen}
              fetchEven={fetctEven}
              fetchEvents={fetctEvents}
            />
          </MDBRow>
        }
      </MDBContainer>
    </div>
  );
};
