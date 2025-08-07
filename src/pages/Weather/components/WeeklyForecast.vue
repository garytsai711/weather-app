<template>
  <section class="weekly-forecast">
    <h3 class="weekly-forecast__title">Weekly Forecast</h3>
    <div class="weekly-forecast__list">
      <div class="weekly-forecast__card" v-for="day in items" :key="day.day">
        <div class="day">
          <span class="icon">
            <img :src="getIconUrl(day.icon)" />
          </span>
          <div class="details">
            <span>{{ day.day }}</span>
            <span>{{ capitalize(day.description) }}</span>
          </div>
        </div>
        <div class="value">
          <div>
            <span>{{ Math.round(day.temp) }}°</span>
            <span>C</span>
          </div>
          <span>
            <img
              src="@/assets/images/general/arrow-right.png"
              alt="Arrow right"
            />
          </span>
        </div>
      </div>
      <div v-if="!items.length" class="empty-state">No weekly data.</div>
    </div>
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
.weekly-forecast {
  display: flex;
  flex-direction: column;
  gap: var(--size-12);
}

.weekly-forecast__list {
  display: flex;
  flex-direction: column;
  gap: var(--size-12);
}

.weekly-forecast__card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--light-blue);
  padding: var(--size-16);
  border-radius: var(--border-md);
  font-size: var(--text-sm);
}

.weekly-forecast__card .day {
  display: flex;
  align-items: center;
  gap: var(--size-8);
}

.weekly-forecast__card .day .icon {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--sky-blue);
  border-radius: var(--border-circle);
  width: var(--size-40);
  height: var(--size-40);
}

.weekly-forecast__card .day .icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.weekly-forecast__card .day .details {
  display: flex;
  flex-direction: column;
  gap: var(--size-8);
}

.weekly-forecast__card .day .details span:nth-child(1) {
  font-size: var(--text-sm);
  font-weight: var(--semi-bold);
}

.weekly-forecast__card .day .details span:nth-child(2) {
  font-size: var(--text-sm);
  color: var(--medium-grey);
}

.weekly-forecast__card .value {
  display: flex;
  align-items: center;
  gap: var(--size-24);
  font-weight: var(--semi-bold);
}

.weekly-forecast__card .value div {
  display: flex;
  align-items: center;
  gap: var(--size-2);
}

.weekly-forecast__card .value div span {
  font-weight: var(--semi-bold);
}

.weekly-forecast__card .value > span {
  width: 5px;
  height: 10px;
}

.weekly-forecast__card .value > span > img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}
</style>
