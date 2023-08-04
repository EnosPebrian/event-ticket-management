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
  //kalo berhasil login, pass datanya ke login
  const [login, setLogin] = useState("");

  const fetchEvent = async () => {
    try {
      const res_users = await api.get("/users");
      const res_events = await api.get("/events");
      setEvents([...res_events.data]);
      setUsers([...res_users.data]);
    } catch (err) {
      console.log(err);
    }
  };

  //update Events dan Users pertama kali setelah document terload
  useEffect(() => {
    fetchEvent();
  }, []);

  // update Events dan Users setelah nilai search diupdate
  useEffect(() => {
    fetchEvent();
  }, [search]);

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
        <Route path="//search-:searchkey" element={<SearchPage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
