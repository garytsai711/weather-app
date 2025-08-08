<template>
  <div class="content-area">
    <!-- Loader -->
    <Loading v-if="store.state.isLoading" />

    <!-- Empty state -->
    <div v-else-if="!weather">No records here.</div>

    <!-- Weather Detail -->
    <template v-else>
      <div class="header-section">
        <div class="header-section__title">
          <button @click="goBack">
            <img
              src="@/assets/images/general/chevron-left-white.png"
              alt="Back"
            />
          </button>
          <h4>{{ cityNameDisplay }}</h4>
          <button @click="addFavourite()">
            <img
              src="@/assets/images/general/addfav.png"
              alt="favourite icon"
            />
          </button>
        </div>
        <div class="header-section__item">
          <div class="date">{{ formatDate(now) }}</div>
          <div class="weather-icon">
            <img
              :src="getIconUrl(weather.weather[0].icon)"
              alt="weather icon"
            />
          </div>
          <div class="temp">
            <span>{{ Math.round(weather.main.temp) }}°</span>
            <span>C</span>
          </div>
          <div class="desc">
            {{ capitalize(weather.weather[0].description) }}
          </div>
          <div class="update-time">
            <span> Last Update {{ lastUpdateTime }} </span>
            <button @click="handleRefresh()">
              <img src="@/assets/images/general/refresh.png" alt="Refresh" />
            </button>
          </div>
        </div>
      </div>

      <div class="body-section">
        <HourlyForecast
          :items="hourlyForecast"
          :getIconUrl="getIconUrl"
          :formatHour="formatHour"
        />
        <WeeklyForecast
          :items="weeklyForecast"
          :getIconUrl="getIconUrl"
          :capitalize="capitalize"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchWeatherByCoords, fetchForecastByCoords } from "@/api/weatherApi";
import type { WeatherResponse, ForecastResponse } from "@/types/weather";
import { getIconUrl, formatDate, formatTime, formatHour } from "@/utils/date";
import HourlyForecast from "./components/HourlyForecast.vue";
import WeeklyForecast from "./components/WeeklyForecast.vue";
import { capitalize, getNum } from "@/utils/general";
import { useStore } from "@/stores/useStore";
import Loading from "@/components/atoms/Feedback/Loading.vue";

const route = useRoute();
const router = useRouter();
const store = useStore();

const lat = getNum(route.query.lat);
const lon = getNum(route.query.lon);

const cityName =
  typeof route.params.cityName === "string" ? route.params.cityName : "";

// --- State ---
const weather = ref<WeatherResponse | null>(null);
const forecast = ref<ForecastResponse | null>(null);
const now = ref(new Date());
const hourlyForecast = ref<any[]>([]);
const weeklyForecast = ref<any[]>([]);

// --- Computed UI ---
const cityNameDisplay = computed(() =>
  weather.value
    ? `${weather.value.name}, ${weather.value.sys.country}`
    : cityName
);

const lastUpdateTime = computed(() => formatTime(now.value));

// --- Navigation ---
function goBack() {
  router.back();
}

// --- Data Loading ---
async function loadWeatherData() {
  // Always start by showing the loader
  store.setLoading(true);
  weather.value = null;
  forecast.value = null;
  hourlyForecast.value = [];
  weeklyForecast.value = [];
  let error = null;

  try {
    // Validate coordinates
    if (
      typeof lat !== "number" ||
      typeof lon !== "number" ||
      isNaN(lat) ||
      isNaN(lon)
    ) {
      store.alert("error", "City coordinates missing.");
      goBack();
      return;
    }

    now.value = new Date();

    // Fetch weather data
    weather.value = await fetchWeatherByCoords(lat, lon);
    forecast.value = await fetchForecastByCoords(lat, lon);

    // No weather found, treat as "empty"
    if (!weather.value) {
      error = "No records here.";
      return;
    }

    // Hourly forecast: first 5 (3-hour interval) blocks
    hourlyForecast.value = forecast.value?.list?.slice(0, 5) || [];

    // Weekly forecast: group by day, pick entry at 12:00 for each day, else fallback
    const dailyMap: Record<string, any> = {};
    for (const item of forecast.value?.list || []) {
      const date = new Date(item.dt_txt);
      const day = date.toLocaleDateString("en-GB", { weekday: "long" });
      if (!dailyMap[day] || date.getHours() === 12) {
        dailyMap[day] = {
          day,
          temp: item.main.temp,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        };
      }
    }
    weeklyForecast.value = Object.values(dailyMap);
  } catch (err) {
    // Optionally, set a reactive error state here
    store.alert("error", "Failed to load weather data.");
    error = "Failed to load weather data.";
  } finally {
    store.setLoading(false);
  }
}

onMounted(loadWeatherData);

const handleRefresh = () => {
  loadWeatherData();
  store.alert("success", "You have refreshed the data successfully");
};

const addFavourite = () => {
  store.alert("success", "You have added this city to your favourite.");
};
</script>

<style scoped>
.content-area {
  display: flex;
  flex-direction: column;
  gap: var(--size-12);
}

.header-section {
  display: flex;
  flex-direction: column;
  gap: var(--size-12);
  padding: var(--size-16);
  background: linear-gradient(
    to right,
    var(--primary-blue),
    var(--secondary-blue),
    var(--accent-blue)
  );
  color: var(--white);
}

.header-section__title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--size-12) 0;
}

.header-section__title button {
  display: flex;
  align-items: center;
}

.header-section__title button:first-child {
  width: 9px;
  height: var(--size-12);
}
.header-section__title button:last-child {
  width: var(--size-16);
  height: var(--size-16);
}

.header-section__title button img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.header-section__item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--size-12);
  padding: var(--size-12) 0 var(--size-16) 0;
}

.header-section__item .date {
  font-size: var(--text-sm);
}

.header-section__item .weather-icon {
  width: 72px;
  height: 72px;
}

.header-section__item .weather-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.header-section__item .temp {
  display: flex;
  align-items: center;
  gap: var(--size-2);
  font-size: var(--text-lg);
}

.header-section__item .desc {
  font-size: var(--text-lg);
  font-weight: var(--semi-bold);
  margin-bottom: var(--size-20);
}

.header-section__item .update-time {
  display: flex;
  align-items: center;
  gap: var(--size-4);
  font-size: var(--text-sm);
}

.header-section__item .update-time button {
  display: flex;
  align-items: center;
}

.header-section__item .update-time button img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.body-section {
  display: flex;
  flex-direction: column;
  gap: var(--size-24);
  padding: var(--size-16);
}
</style>
