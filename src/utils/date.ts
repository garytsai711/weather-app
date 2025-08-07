// // Weather icon url
// export function getIconUrl(icon?: string) {
//   return icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : "";
// }
// --- Weather icon imports ---
import weatherCloudy from "@/assets/images/weather/weather-cloudy.png";
import weatherRainy from "@/assets/images/weather/weather-rainy.png";
import weatherNightStorm from "@/assets/images/weather/weather-night-storm.png";
import weatherPartlyCloudy from "@/assets/images/weather/weather-partly-cloudy.png";

const weatherIconMap: Record<string, string> = {
  "01d": weatherCloudy, // Clear sky, but mapped to "cloudy" by your request
  "01n": weatherCloudy,
  "02d": weatherPartlyCloudy, // Few clouds
  "02n": weatherPartlyCloudy,
  "03d": weatherCloudy, // Scattered clouds
  "03n": weatherCloudy,
  "04d": weatherCloudy, // Broken clouds
  "04n": weatherCloudy,
  "10d": weatherRainy, // Rain
  "10n": weatherRainy,
  // Add more as needed
};

// Weather icon url
export function getIconUrl(icon?: string) {
  return icon
    ? weatherIconMap[icon] ?? `https://openweathermap.org/img/wn/${icon}@2x.png`
    : "";
}

// Format time (from your code)
export function formatTime(
  date: Date,
  locale = "en-GB",
  options?: Intl.DateTimeFormatOptions
) {
  let formatted = new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    ...options,
  }).format(date);
  formatted = formatted.replace(/am|pm/i, (match) => match.toUpperCase());
  return formatted;
}

// Format date (from your code, plus day name as option)
export function formatDate(
  date: Date,
  locale = "en-GB",
  options?: Intl.DateTimeFormatOptions
) {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    ...options,
  }).format(date);
}

// Format hour from datetime string (your pattern)
export function formatHour(dt_txt: string, locale = "en-GB") {
  return new Date(dt_txt).toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

// Day or night checker
export function getDayOrNight(date: Date): "Day" | "Night" {
  const hour = date.getHours();
  return hour >= 19 || hour < 6 ? "Night" : "Day";
}
