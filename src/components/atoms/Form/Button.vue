<template>
  <button
    :type="type"
    class="btn-api"
    :class="{ 'is-loading': store.state.isLoading }"
    :disabled="store.state.isLoading || disabled"
    @click="emit('click')"
  >
    <slot />
    <span v-if="store.state.isLoading" class="loader">
      <svg viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50" />
      </svg>
    </span>
  </button>
</template>

<script setup lang="ts">
import { useStore } from "@/stores/useStore";

const store = useStore();

const props = defineProps<{
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: "click"): void;
}>();

const type = props.type ?? "button";
</script>

<style scoped>
.btn-api {
  position: relative;
  padding: 0.5rem 1rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-api.is-loading {
  opacity: 0.7;
  pointer-events: none;
}

.loader {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.2rem;
  height: 1.2rem;
}

.loader svg {
  animation: spin 1s linear infinite;
}

.loader circle {
  stroke: white;
  stroke-width: 3;
  fill: none;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
