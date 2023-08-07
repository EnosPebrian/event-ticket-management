import React, { useState, useEffect } from "react";
import api from "../json-server/api";
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
} from "mdb-react-ui-kit";
import { Spinner } from "react-bootstrap";
import { type } from "@testing-library/user-event/dist/type";
import { Profile } from "../components/dashboardprofile";
export const DashboardProfile = ({
  events_map,
  setEvents_map,
  users_map,
  setUsers_map,
}) => {
  return (
    <Profile
      events_map={events_map}
      setEvents_map={setEvents_map}
      users_map={users_map}
      setUsers_map={setUsers_map}
    />
  );
};
