import "./App.css";
import Header from "./components/Header-navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Eventdisplay from "./pages/event-display";
import api from "./json-server/api";
import { useEffect, useState } from "react";

function App() {
  const [search, setSearch] = useState([]);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const fetchEvent = async () => {
    const res_users = await api.get("/users");
    const res_events = await api.get("/events");
    setEvents([...res_users]);
    setUsers([...res_events]);
  };
  useEffect(() => {
    fetchEvent();
  }, []);

  useEffect(() => {
    fetchEvent();
  }, [search]);

  return (
    <>
      <Header setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Eventdisplay search={search} />} />
        <Route path="/:eventname" element={<Eventdisplay />} />
      </Routes>
    </>
  );
}

export default App;
