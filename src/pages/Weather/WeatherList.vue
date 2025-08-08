<template>
  <div class="content-area">
    <div class="header-section">
      <h1>Weather</h1>
      <router-link to="/profile">
        <img src="@/assets/images/general/user.png" alt="User" />
      </router-link>
    </div>

    <!-- Parent.vue (inside <template>) -->
    <div class="search-section">
      <SearchBar
        v-model="search"
        :cities="suggestions"
        placeholder="Search for a city or airport"
        @search="onSearchInput"
        @select="selectCity"
      />
    </div>

    <div class="body-section">
      <Loading v-if="store.state.isLoading" />
      <div v-else-if="weatherList.length === 0">No records here.</div>
      <WeatherCard
        v-for="(weather, index) in weatherList"
        v-else
        :key="weather.id"
        :weather="weather"
        :isMyLocation="index === 0"
        :getTime="getTime"
        :capitalize="capitalize"
        :timeOfDay="getDayOrNightForWeather(weather, index === 0)"
        @click="goToDetail(weather, index)"
      />
      <div v-if="geoError" class="error-msg">{{ geoError }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { useStore } from "@/stores/useStore";
import { fetchWeatherByCoords, searchCitySuggestions } from "@/api/weatherApi";
import type { WeatherResponse, CitySuggestion } from "@/types/weather";
import WeatherCard from "./components/WeatherCard.vue";
import tzlookup from "tz-lookup";
import { capitalize } from "@/utils/general";
import { formatTime, getDayOrNight } from "@/utils/date";
import { useGeolocation } from "@/composables/useGeolocation";
import Loading from "@/components/atoms/Feedback/Loading.vue";
import SearchBar from "@/components/molecules/Form/SearchBar.vue";

const router = useRouter();
const store = useStore();
const search = ref("");
const suggestions = ref<CitySuggestion[]>([]);
const weatherList = ref<WeatherResponse[]>([]);

const getTime = (weather: WeatherResponse, isMyLocation: boolean) => {
  if (isMyLocation) {
    return formatTime(new Date());
  }
  const tz = (weather as any).timezone_str;
  if (tz) {
    return formatTime(new Date(), "en-GB", { timeZone: tz });
  }
  return "N/A";
};

const getDayOrNightForWeather = (
  weather: WeatherResponse,
  isMyLocation: boolean
) => {
  let tz = isMyLocation
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : (weather as any).timezone_str;
  if (!tz) return "Day"; // fallback

  const now = new Date();
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      hour12: false,
      timeZone: tz,
    }).format(now)
  );
  const localDate = new Date(now);
  localDate.setHours(hour);

  return getDayOrNight(localDate);
};

const onSearchInput = async () => {
  if (search.value.length < 2) {
    suggestions.value = [];
    return;
  }
  try {
    suggestions.value = await searchCitySuggestions(search.value);
  } catch {
    store.alert("error", "Failed to fetch suggestions.");
  }
};

// Redirect to weather detail page of the city
const selectCity = async (city: CitySuggestion) => {
  suggestions.value = [];
  search.value = "";
  store.setLoading(true);
  try {
    const weather = await fetchWeatherByCoords(city.lat, city.lon);
    (weather as any).timezone_str = tzlookup(city.lat, city.lon);
    if (!weatherList.value.some((w) => w.id === weather.id)) {
      weatherList.value.push(weather);
    }
    // Navigate to WeatherDetail
    await router.push({
      name: "weather-detail",
      params: { cityName: city.name },
      query: { lat: city.lat, lon: city.lon },
    });
  } catch {
    store.alert("error", "Failed to load city weather.");
  } finally {
    store.setLoading(false);
  }
};

// Click weather card to view details
const goToDetail = async (weather: WeatherResponse, index: number) => {
  const cityName = index === 0 ? "My Location" : weather.name;
  const lat = weather.coord.lat;
  const lon = weather.coord.lon;

  await router.push({
    name: "weather-detail",
    params: { cityName },
    query: { lat, lon },
  });
};

// Use geolocation composables ---
const { coords, error: geoError, getLocation } = useGeolocation();

// Watch for new coords and load weather for My Location
watch(coords, async (val) => {
  if (val) {
    store.setLoading(true);
    try {
      const weather = await fetchWeatherByCoords(val.lat, val.lon);
      (weather as any).timezone_str = tzlookup(val.lat, val.lon);
      if (!weatherList.value.some((w) => w.id === weather.id)) {
        weatherList.value.unshift(weather);
      }
    } catch {
      store.alert("error", "Failed to load weather for your location.");
    } finally {
      store.setLoading(false);
    }
  }
});

// Onmounted get geolocation, then add default cities
onMounted(async () => {
  if (!import.meta.env.VITE_OPENWEATHERMAP_API_KEY) {
    store.alert("error", "Weather API key is missing. Please configure it.");
    return;
  }

  getLocation();

  const cities = [
    { name: "Seongnam-si", country: "KR" },
    { name: "London", country: "GB" },
    { name: "Milan", country: "IT" },
  ];

  store.setLoading(true);
  try {
    const weatherPromises = cities.map(async ({ name, country }) => {
      const results = await searchCitySuggestions(`${name},${country}`);
      const city = results[0];
      if (!city) return null;
      const weather = await fetchWeatherByCoords(city.lat, city.lon);
      (weather as any).timezone_str = tzlookup(city.lat, city.lon);
      return weather;
    });

    const weatherArr = await Promise.all(weatherPromises);

    weatherArr.forEach((weather) => {
      if (weather && !weatherList.value.some((w) => w.id === weather.id)) {
        weatherList.value.push(weather);
      }
    });
  } catch {
    store.alert("error", "Failed to load default cities.");
  } finally {
    store.setLoading(false);
  }
});
</script>

<style scoped>
.content-area {
  display: flex;
  flex-direction: column;
  gap: var(--size-12);
  padding: var(--size-16);
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--size-12);
}

.header-section a {
  display: flex;
  align-items: center;
  width: var(--size-16);
  height: var(--size-20);
}

.header-section img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.body-section {
  display: flex;
  flex-direction: column;
  gap: var(--size-12);
}
</style>
