<template>
  <section class="hourly-forecast">
    <h3 class="hourly-forecast__title">Hourly Forecast</h3>
    <div class="hourly-forecast__list">
      <div
        class="hourly-forecast__card"
        v-for="item in items"
        :key="item.dt_txt"
      >
        <span> <img :src="getIconUrl(item.weather[0].icon)" /> </span>
        <span class="temp">{{ Math.round(item.main.temp) }}°</span>
        <span class="time">{{ formatHour(item.dt_txt) }}</span>
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
.hourly-forecast {
  display: flex;
  flex-direction: column;
  gap: var(--size-12);
}

.hourly-forecast__list {
  display: flex;
  flex-wrap: nowrap;
  gap: var(--size-12);
  padding-bottom: var(--size-8);
  overflow-x: auto;
}

.hourly-forecast__card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--light-grey);
  border-radius: var(--border-sm);
  padding: var(--size-12) var(--size-16);
  gap: var(--size-4);
}

.hourly-forecast__card span:nth-child(1) {
  width: var(--size-40);
  height: var(--size-40);
}

.hourly-forecast__card span:nth-child(1) img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hourly-forecast__card span:nth-child(2) {
  font-size: var(--text-sm);
  font-weight: var(--semi-bold);
  margin-bottom: var(--size-8);
}

.hourly-forecast__card span:nth-child(3) {
  font-size: var(--text-xs);
  color: var(--medium-grey);
  white-space: nowrap;
}
</style>
