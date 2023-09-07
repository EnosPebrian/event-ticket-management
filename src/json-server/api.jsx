import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:2444",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("auth")}`,
  },
});

export default api;
