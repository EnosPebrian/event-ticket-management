import "./App.css";
import Header from "./components/Header-navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Eventdisplay from "./pages/event-display";
import api from "./json-server/api";
import { useEffect, useState } from "react";
import SingleEventDisplay from "./pages/single-event-display";
import Register from "./components/register";
import { Login } from "./components/login";
import { SearchPage } from "./pages/search-page";

function App() {
  //untuk set search, event-event, dan user-user
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [users_map, setUsers_map] = useState(new Map());
  const [events_map, setEvents_map] = useState(new Map());

  //kalo berhasil login, pass datanya ke login
  const [login, setLogin] = useState("");

  const fetchEvents = async () => {
    try {
      const res_events = await api.get("/events");
      const temp_events_map = new Map();
      res_events.data.map((an_event) =>
        temp_events_map.set(an_event.id, an_event)
      );
      setEvents_map(temp_events_map);
      setEvents([...res_events.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res_users = await api.get("/users");
      const temp_users_map = new Map();
      res_users.data.map((user) => temp_users_map.set(user.id, user));
      setUsers_map(temp_users_map);
      setUsers([...res_users.data]);
    } catch (err) {
      console.log(err);
    }
  };

  //update Events dan Users pertama kali setelah document terload
  useEffect(() => {
    fetchEvents();
    fetchUsers();
  }, []);

  return (
    <>
      {/* navbarnya (Header) diluar routes jadi satu navbar untuk semua*/}
      <Header setSearch={setSearch} />
      <Routes>
        <Route
          path="/"
          element={
            <Eventdisplay
              search={search}
              events={[...events]}
              setEvents={setEvents}
              users={[...users]}
            />
          }
        />
        <Route
          path="/:eventid/:eventname"
          element={
            <SingleEventDisplay
              search={search}
              events={[...events]}
              setEvents={setEvents}
              users={[...users]}
            />
          }
        />
        <Route
          path="search/:searchkey"
          element={
            <SearchPage
              search={search}
              users_map={users_map}
              events_map={events_map}
              events={events}
              setSearch={setSearch}
            />
          }
        />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
