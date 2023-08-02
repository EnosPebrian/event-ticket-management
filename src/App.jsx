import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header-navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Eventdisplay from "./pages/event-display";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Eventdisplay />} />
        <Rout path="/:eventname" element={<Eventdisplay />} />
      </Routes>
    </>
  );
}

export default App;
