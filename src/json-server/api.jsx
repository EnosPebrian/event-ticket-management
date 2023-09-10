import axios from "axios";

const api = axios.create({
  baseURL: "https://fomophobia-api.crystalux.site",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("auth")}`,
    "api-key": "fomophobic",
  },
});

export default api;
