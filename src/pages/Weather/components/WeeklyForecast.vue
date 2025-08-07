<template>
  <section class="forecast-section">
    <div class="forecast-title">Weekly Forecast</div>
    <div class="weekly-forecast-card" v-for="day in items" :key="day.day">
      <div class="weekly-day">
        <img :src="getIconUrl(day.icon)" />
        <div>
          <div class="weekly-title">{{ day.day }}</div>
          <div class="weekly-desc">{{ capitalize(day.description) }}</div>
        </div>
      </div>
      <div class="weekly-temp">{{ Math.round(day.temp) }}°C</div>
    </div>
    <div v-if="!items.length" class="empty-state">No weekly data.</div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  items: any[];
  getIconUrl: (icon?: string) => string;
  capitalize: (text: string) => string;
}>();
</script>

<style scoped>
.forecast-section {
  background: #fff;
  border-radius: 20px 20px 0 0;
  color: #222;
  margin-top: 16px;
  padding: 22px 14px 24px 14px;
}
.forecast-title {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 10px;
}
.weekly-forecast-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #e6f0ff;
  border-radius: 15px;
  padding: 13px 14px;
  margin-bottom: 12px;
}
.weekly-day {
  display: flex;
  align-items: center;
  gap: 12px;
}
.weekly-day img {
  width: 30px;
  height: 30px;
}
.weekly-title {
  font-weight: 600;
  font-size: 16px;
}
.weekly-desc {
  font-size: 14px;
  color: #4785c8;
}
.weekly-temp {
  font-size: 20px;
  font-weight: bold;
  color: #3068b0;
}
.empty-state {
  padding: 8px;
  font-size: 15px;
  color: #888;
}
</style>
