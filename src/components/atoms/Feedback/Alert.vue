<template>
  <div v-if="alert.show" :class="['alert', typeClass]">
    {{ alert.message }}
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@/stores/useStore";

const store = useStore();
const alert = store.state.alert;

const typeClass = computed(() => {
  switch (alert.type) {
    case "success":
      return "alert--success";
    case "error":
      return "alert--error";
    default:
      return "alert--info";
  }
});
</script>

<style scoped>
.alert {
  padding: 0.75rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  color: white;
  margin-top: 1rem;
}

.alert--success {
  background-color: #4caf50;
}

.alert--error {
  background-color: #f44336;
}

.alert--info {
  background-color: #2196f3;
}
</style>
