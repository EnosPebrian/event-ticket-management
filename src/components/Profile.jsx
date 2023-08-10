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

export const Profile = () => {
  const nav = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [event, setEvent] = useState();
  console.log(event);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const userSelector = useSelector((state) => state.auth);

  console.log(userSelector);

  const topup = () => {
    nav("/dashboardprofile/topup");
  };

  const fetctEvents = async () => {
    const userevent = userSelector.events;
    const temp = [];
    for (let id of userevent) {
      let res = await api.get(`/events/${id}`);
      temp.push(res.data);
      console.log("ini res", res);
    }
    console.log(`temp`, temp);

    setEvent(temp);
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
                  <a
                    href=""
                    style={{
                      color: "black",
                      fontWeight: "600",
                      letterSpacing: "1px",
                    }}
                  >
                    Event Post
                  </a>
                </div>
                <div
                  className="hover:bg-white p-1 "
                  style={{ color: "black", borderRadius: "4px" }}
                >
                  <button
                    onClick={openModal}
                    style={{
                      color: "black",
                      fontWeight: "600",
                      letterSpacing: "1px",
                    }}
                  >
                    Create Event
                  </button>
                </div>
                <div
                  className="hover:bg-white text-black p-1 "
                  style={{ color: "white", borderRadius: "4px" }}
                >
                  <a
                    href=""
                    style={{
                      color: "black",
                      fontWeight: "600",
                      letterSpacing: "1px",
                    }}
                  >
                    Transaction
                  </a>
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
                        <button class="btn btn-primary mr-2">Edit</button>
                        <button class="btn btn-primary">Delete</button>
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
                event={event}
              />
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};
