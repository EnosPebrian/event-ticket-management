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

export const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
                <MDBTypography tag="h4">{""}</MDBTypography>
                <MDBCardText className="text-muted mb-4">
                  <a href="#!">{""}</a>
                </MDBCardText>
                <div className="mb-4 pb-2"></div>
                <Button>Message now</Button>
                <div className="d-flex justify-content-between text-center mt-5 mb-2">
                  <div>
                    <MDBCardText className="mb-1 h5">8471</MDBCardText>
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
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "5px",
                    padding: "2px",
                  }}
                >
                  <a href="">Event Post</a>
                </div>
                <div
                  style={{
                    color: "black",
                    borderRadius: "5px",
                    padding: "2px",
                  }}
                  className="hover:bg-white"
                >
                  <button onClick={openModal}>Create Event</button>
                </div>
                <div
                  style={{
                    color: "black",
                    borderRadius: "5px",
                    padding: "2px",
                    fontWeight: "",
                  }}
                  className="hover:bg-white"
                >
                  <a href="">Transaction</a>
                </div>
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