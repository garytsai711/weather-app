import { apiService } from "@/services/apiService";
import type {
  WeatherResponse,
  ForecastResponse,
  CitySuggestion,
} from "@/types/weather";

// ✅ Weather by lat/lon
export const fetchWeatherByCoords = async (
  lat: number,
  lon: number
): Promise<WeatherResponse> => {
  const response = await apiService.get("/weather", {
    params: { lat, lon, units: "metric" },
  });
  return response.data;
};

// ✅ 5-day forecast by lat/lon
export const fetchForecastByCoords = async (
  lat: number,
  lon: number
): Promise<ForecastResponse> => {
  const response = await apiService.get("/forecast", {
    params: { lat, lon, units: "metric" },
  });
  return response.data;
};

// ✅ City suggestions (geocoding API)
// ✅ searchCitySuggestions.ts
export const searchCitySuggestions = async (
  query: string,
  countryCode = ""
): Promise<CitySuggestion[]> => {
  const params: Record<string, string | number> = {
    q: query,
    limit: 5,
    appid: import.meta.env.VITE_OPENWEATHERMAP_API_KEY,
  };

  if (countryCode) params.country = countryCode; // optional country filtering

  const response = await apiService.get("/direct", {
    baseURL: "https://api.openweathermap.org/geo/1.0",
    params,
  });

  return response.data;
};
