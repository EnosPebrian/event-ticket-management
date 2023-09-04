import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Eventdisplay from "./pages/event-display";
import api from "./json-server/api";
import { useEffect, useState } from "react";
import { routes } from "./routes/routes";
import { useDispatch } from "react-redux";
import { types } from "./redux/types";
import HeaderNavbar from "./components/Header-navbar";

function App() {
  const dispatch = useDispatch();

  async function dispatcher() {
    try {
      const token = localStorage.getItem("auth");
      const res = await api.get(`users/token?token=${token}`);
      const user = res.data;
      dispatch({ type: types.login, payload: { ...user } });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    dispatcher();
  }, []);

  return (
    <>
      <Routes>
        {routes.map((route) => (
          <Route {...route} />
        ))}
      </Routes>
    </>
  );
}

export default App;
