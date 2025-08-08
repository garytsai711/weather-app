import axios from "axios";

const BASE_URL = import.meta.env.VITE_OPENWEATHERMAP_BASE_URL;
const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

if (!BASE_URL || !API_KEY) {
  // throw new Error("Missing OpenWeatherMap API configuration.");
}

export const apiService = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: "metric",
  },
});
