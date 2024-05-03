import axios from "axios";
const BASE_URL =
  import.meta.env.VITE_NODE_ENV === "dev"
    ? "http://localhost:3500/api/"
    : "https://zeesound-api.vercel.app/api/";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosProtect = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
