// TODO: make axios instance
// https://github.dev/BekaBadzagua/redberry-interns-vue-jwt
// npm install axios - ეს ეყოფა წესით

// getJWTtoken ar gaintersebs

// ასევე env გამართე ისე ბასე ურლ არ იმუშავებს

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 1000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "X-Requested-With": "XMLHttpRequest",
  },
});
export default axiosInstance;
