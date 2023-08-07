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
import { routes } from "./routes/routes";

function App() {
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
