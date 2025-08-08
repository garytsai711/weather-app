import axios from "axios";
import { useStore } from "@/stores/useStore";

const BASE_URL = import.meta.env.VITE_OPENWEATHERMAP_BASE_URL;
const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

if (!BASE_URL || !API_KEY) {
  const store = useStore();
  store.alert("error", "Missing OpenWeatherMap API configuration.");
  // throw new Error("Missing OpenWeatherMap API configuration.");
}

export const apiService = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: "metric",
  },
});
