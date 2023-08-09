import "./App.css";
import Header from "./components/Header-navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Eventdisplay from "./pages/event-display";
import api from "./json-server/api";
import { useEffect, useState } from "react";
import { routes } from "./routes/routes";
import { useDispatch } from "react-redux";
import { types } from "./redux/types";

function App() {
  const dispatch = useDispatch();
  //check local storage, kalo ada isinya, dispatch
  async function dispatcher() {
    try {
      const userid = JSON.parse(localStorage.getItem("auth")).id;
      const res = await api.get(`users/${userid}`);
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
      <Header />
      <Routes>
        {routes.map((route) => (
          <Route {...route} />
        ))}
      </Routes>
    </>
  );
}

export default App;
