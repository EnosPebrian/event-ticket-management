import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:2444" });

export default api;
