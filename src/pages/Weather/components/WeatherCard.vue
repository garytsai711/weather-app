<template>
  <div
    class="weather-card"
    @click="$emit('click')"
    :class="timeOfDay.toLowerCase()"
  >
    <div class="weather-card__header">
      <div class="location">
        <div class="name">
          {{ isMyLocation ? "My Location" : weather.name }}
        </div>
        <div class="time">
          {{ getTime(weather, isMyLocation) }}
        </div>
      </div>
      <div class="temp">{{ Math.round(weather.main.temp) }}°</div>
    </div>
    <div class="weather-card__footer">
      <div class="condition">
        {{ capitalize(weather.weather[0].description) }}
      </div>

      <div class="hi-low">
        <span>H:{{ Math.round(weather.main.temp_max) }}°</span>
        <span>L:{{ Math.round(weather.main.temp_min) }}°</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WeatherResponse } from "@/types/weather";

defineProps<{
  weather: WeatherResponse;
  isMyLocation: boolean;
  getTime: (weather: WeatherResponse, isMyLocation: boolean) => string;
  capitalize: (text: string) => string;
  timeOfDay: "Day" | "Night";
}>();
</script>

<style scoped>
.weather-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--size-24);
  padding: var(--size-12);
  color: white;
  border-radius: var(--border-md);
  background-size: cover;
  background-position: center;
  cursor: pointer;
}

.weather-card.day {
  background-image: url("@/assets/images/weather/bg-weather-day.png");
}

.weather-card.night {
  background-image: url("@/assets/images/weather/bg-weather-night.png");
}

.weather-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.weather-card__header .location {
  display: flex;
  flex-direction: column;
  gap: var(--size-4);
}

.weather-card__header .temp {
  font-size: var(--text-xxxl);
  letter-spacing: 2px;
}

.weather-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.weather-card__footer .hi-low {
  display: flex;
  gap: var(--size-8);
}

.weather-card__footer .hi-low span {
  letter-spacing: 0.5px;
}
</style>
