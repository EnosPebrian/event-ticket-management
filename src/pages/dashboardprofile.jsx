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
  const [users, setUsers] = useState();
  const [events, setEvents] = useState();

  const findPhoto = async () => {
    for (let [key, value] of users_map.entries()) {
      setUsers(value);
    }
    for (let [key, value] of events_map.entries()) {
      setEvents(value);
    }
  };
  console.log(users);
  console.log(events);

  useEffect(() => {
    findPhoto();
  }, [events_map]);

  return <Profile />;
};
