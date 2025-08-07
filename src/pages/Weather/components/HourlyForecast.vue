<template>
  <section class="hourly-forecast">
    <h3 class="hourly-forecast__title">Hourly Forecast</h3>
    <div class="hourly-forecast__list">
      <div
        class="hourly-forecast__card"
        v-for="item in items"
        :key="item.dt_txt"
      >
        <img :src="getIconUrl(item.weather[0].icon)" />
        <div class="hourly-temp">{{ Math.round(item.main.temp) }}°</div>
        <div class="hourly-time">{{ formatHour(item.dt_txt) }}</div>
      </div>
      <div v-if="!items.length" class="empty-state">No hourly data.</div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  items: any[];
  getIconUrl: (icon?: string) => string;
  formatHour: (dt_txt: string) => string;
}>();
</script>

<style scoped>
.hourly-forecast__list {
  display: flex;
  flex-wrap: wrap;
}

.hourly-forecast__card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--light-grey);
  border-radius: var(--border-sm);
}
.forecast-title {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 10px;
}
.hourly-forecast-list {
  display: flex;
  gap: 14px;
  overflow-x: auto;
  margin-bottom: 18px;
}
.hourly-forecast-card {
  background: #f5f8fa;
  border-radius: 16px;
  min-width: 74px;
  text-align: center;
  padding: 10px 0;
  box-shadow: 0 2px 4px rgba(80, 150, 240, 0.07);
}
.hourly-forecast-card img {
  width: 36px;
  height: 36px;
}
.hourly-temp {
  font-weight: 600;
  font-size: 16px;
}
.hourly-time {
  font-size: 13px;
  opacity: 0.7;
  margin-top: 2px;
}
.empty-state {
  padding: 8px;
  font-size: 15px;
  color: #888;
}
</style>
