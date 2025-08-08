// This is image url from openweathermap response
// export function getIconUrl(icon?: string) {
//   return icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : "";
// }

// These are images provided in the Figma but they are not optimised correctly. Not all weather assets are provided.
import weatherCloudy from "@/assets/images/weather/weather-cloudy.png";
import weatherRainy from "@/assets/images/weather/weather-rainy.png";
import weatherNightStorm from "@/assets/images/weather/weather-night-storm.png";
import weatherPartlyCloudy from "@/assets/images/weather/weather-partly-cloudy.png";

const weatherIconMap: Record<string, string> = {
  "01d": weatherCloudy, // Clear sky, but mapped to "cloudy"
  "01n": weatherCloudy,
  "02d": weatherPartlyCloudy, // Few clouds
  "02n": weatherPartlyCloudy,
  "03d": weatherCloudy, // Scattered clouds
  "03n": weatherCloudy,
  "04d": weatherCloudy, // Broken clouds
  "04n": weatherCloudy,
  "10d": weatherRainy, // Rain
  "10n": weatherRainy,
  "11d": weatherNightStorm, // Thunderstorm day
  "11n": weatherNightStorm, // Thunderstorm night
};

// Weather icon url
export function getIconUrl(icon?: string) {
  return icon
    ? weatherIconMap[icon] ?? `https://openweathermap.org/img/wn/${icon}@2x.png`
    : "";
}

// Format time
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

// Format date (plus day name as option)
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

// Format hour from datetime string
export function formatHour(dt_txt: string, locale = "en-US") {
  return new Date(dt_txt)
    .toLocaleTimeString(locale, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true, // 12-hour format with AM/PM
    })
    .replace(/am|pm/i, (match) => match.toUpperCase());
}

// Day or night checker
export function getDayOrNight(date: Date): "Day" | "Night" {
  const hour = date.getHours();
  return hour >= 19 || hour < 6 ? "Night" : "Day";
}
