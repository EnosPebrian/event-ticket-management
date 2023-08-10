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
import { useNavigate } from "react-router-dom";
import api from "../json-server/api";
import { Photo } from "@mui/icons-material";
import userEvent from "@testing-library/user-event";
import uuid from "react-uuid";

export const Profile = () => {
  const nav = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [event, setEvent] = useState();
  const ticketNumber = uuid();
  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const userSelector = useSelector((state) => state.auth);
  console.log(`tes`, userSelector);

  const topup = () => {
    nav("/dashboardprofile/topup");
  };

  const fetctEvents = async () => {
    const userevent = userSelector.events;
    const temp = [];
    for (let id of userevent) {
      let res = await api.get(`/events/${id}`);
      temp.push(res.data);
    }
    console.log(temp, `temp`);
    setEvent(temp);
  };

  async function deleteEvent(ev) {
    const today = new Date().toISOString().split("T")[0];
    console.log(today);
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
              console.log(item.id);
              const a = await api.delete(`tickets/${item.id}`);
              console.log(a);

              alert(
                `successfully retrieving ${this_user.name} credits from ${temp_points} to ${this_user.points}`
              );
            }
          }
          await api.delete(`events/${ev.id}`);
        }
      } else {
        await api.delete(`events/${ev.id}`);
      }
    }
    fetctEvents();
  }

  const ticketDetail = () => {
    nav("/ticket");
  };

  useEffect(() => {
    fetctEvents();
  }, []);

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
        style={{ display: "flex", justifyContent: "space-between" }}
      >

        <MDBRow className="space-x-0 ">
          <MDBCol md="12" xl="4" style={{ width: "600px" }}>
            <MDBCard style={{ borderRadius: "15px" }}>
              <MDBCardBody className="text-center">
                <div className="mt-3 mb-4">
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                    className="rounded-circle"
                    fluid
                    style={{ width: "100px" }}
                  />
                </div>
                <MDBTypography tag="h4">{userSelector.username}</MDBTypography>
                <MDBCardText className="text-muted mb-4">
                  <a href="#!">{userSelector.referralcode}</a>
                </MDBCardText>
                <div className="mb-4 pb-2"></div>
                <Button onClick={topup}>Topup Saldo</Button>
                <div className="d-flex justify-content-between text-center mt-5 mb-2">
                  <div>
                    <MDBCardText className="mb-1 h5">
                      {userSelector.points}
                    </MDBCardText>
                    <MDBCardText className="small text-muted mb-0">
                      Wallets Balance
                    </MDBCardText>
        {
          <MDBRow className="space-x-0 ">
            <MDBCol
              md="12"
              xl="4"
              style={{ width: "600px" }}
              className="card atas"
            >
              <MDBCard style={{ borderRadius: "15px" }}>
                <MDBCardBody className="text-center">
                  <div className="mt-3 mb-4">
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      className="rounded-circle"
                      fluid
                      style={{ width: "100px" }}
                    /> b00115d28b4e81552d1480a512d8b59fcd7c3445
                  </div>
                  <MDBTypography tag="h4">{""}</MDBTypography>
                  <MDBCardText className="text-muted mb-4">
                    <a href="#!">{""}</a>
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
                      <MDBCardText className="mb-1 h5">8512</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Followers
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

                <MDBCardBody
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
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            {/* events details*/}
            <MDBCol
              style={{
                backgroundColor: "white",
                width: "800px",
              }}
            >
              <div style={{ padding: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "#0D6EFD",
                    padding: "10px",
                    borderRadius: "5px",
                    color: "white",
                  }}
                >
                  <div
                    className="bg-white p-1 "
                    style={{ color: "black", borderRadius: "4px" }}
                  >
                    <a href="">Event Post</a>
                  </div>
                  <div
                    className="hover:bg-white p-1 "
                    style={{ color: "black", borderRadius: "4px" }}
                  >
                    <button onClick={openModal}>Create Event</button>
                  </div>
                  <div
                    className="hover:bg-white p-1 "
                    style={{ color: "black", borderRadius: "4px" }}
                  >
                    <a href="">Transaction</a>
                  </div>

                {/* event post */}
              </div>
              <div>
                {event?.map((event, idx) => {
                  return (
                    <div
                      className="card mt-4"
                      style={{ width: "18rem" }}
                      key={idx}
                    >
                      <img src={event.photo} class="card-img-top"></img>
                      <div class="card-body">
                        <h5 class="card-title">{event.name}</h5>
                        <p class="card-text">{event.category}</p>
                        <button
                          class="btn btn-primary mr-2"
                          onClick={() => {
                            nav(`/${event.id}/edit_event/${event.name}`);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          class="btn btn-primary"
                          onClick={() => deleteEvent(event)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <ModalCreate
                openModal={openModal}
                setIsModalOpen={setIsModalOpen}
                closeModal={closeModal}
                isModalOpen={isModalOpen}
              />
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};
