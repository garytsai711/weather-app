<template>
  <button
    :type="type"
    class="btn-api"
    :class="{ 'is-loading': store.state.isLoading }"
    :disabled="store.state.isLoading || disabled"
    @click="emit('click')"
  >
    <slot />
    <div v-if="store.state.isLoading" class="loader">
      <svg viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
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
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.loader svg {
  width: 1.5rem;
  height: 1.5rem;
  transform-origin: center;
  animation: rotate4 1.2s linear infinite;
  display: block;
}

.loader circle {
  fill: none;
  stroke: var(
    --light-grey,
    var(--light-grey)
  ); /* fallback if --grey isn't set */
  stroke-width: 4;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: dash4 1.5s ease-in-out infinite;
}

/* Loader spinning animation */
@keyframes rotate4 {
  100% {
    transform: rotate(360deg);
  }
}

/* Loader dash animation */
@keyframes dash4 {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dashoffset: -125px;
  }
}

.btn-api {
  background: var(--primary-button);
  color: #fff;
  font-weight: var(--semi-bold);
  border-radius: var(--border-sm);
  transition: background 0.2s;
  letter-spacing: 2px;
}

.btn-api:hover {
  background: var(--primary-button-hover);
}

.btn-api:focus {
  background: var(--primary-button-active);
}

.btn-api:focus:not(:focus-visible) {
  background: var(--primary-button);
}

.btn-api:focus:hover {
  background: var(--primary-button-hover);
}

.btn-api:focus:active {
  background: var(--primary-button-active);
}
</style>
