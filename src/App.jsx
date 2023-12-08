import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import api from "./json-server/api";
import { useEffect } from "react";
import { routes } from "./routes/routes";
import { useDispatch } from "react-redux";
import { types } from "./redux/types";

function App() {
  const dispatch = useDispatch();

  async function dispatcher() {
    try {
      const token = localStorage.getItem("auth");
      const res = await api.post(`/users/token`);
      const user = res.data.user;
      localStorage.setItem("auth", res.data.token);
      dispatch({ type: types.login, payload: { ...user } });
    } catch (err) {
      localStorage.removeItem("auth");
    }
  }

  useEffect(() => {
    dispatcher();
  }, []);

  return (
    <>
      <Routes>
        {routes.map((route, index) => (
          <Route {...route} key={`route-` + index} />
        ))}
      </Routes>
    </>
  );
}

export default App;
