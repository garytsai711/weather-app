<template>
  <transition name="fade">
    <div
      v-if="store.state.alert.show"
      :class="['alert-item', store.state.alert.type]"
      @click="clearAlert"
    >
      <button class="icon" v-if="store.state.alert.type === 'success'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path
            d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"
          />
        </svg>
      </button>
      <button class="icon" v-if="store.state.alert.type === 'error'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path
            d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8-9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
          />
        </svg>
      </button>
      <span class="message">{{ store.state.alert.message }}</span>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useStore } from "@/stores/useStore";

const store = useStore();

function clearAlert() {
  store.clearAlert();
}
</script>

<style scoped>
.alert-item {
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: start;
  align-items: center;
  text-align: center;
  gap: var(--size-12);
  padding: var(--size-12) var(--size-16);
  background: var(--black);
  color: var(--white);
  border-radius: var(--border-md);
  font-weight: var(--semi-bold);
  line-height: 1.2;
  z-index: 9999;
  cursor: pointer;
}

.alert-item .icon {
  min-width: var(--size-32);
  max-width: var(--size-32);
  min-height: var(--size-32);
  max-height: var(--size-32);
  background: var(--sky-blue);
  border-radius: var(--border-circle);
  display: flex;
  justify-content: center;
  align-items: center;
}

.alert-item .icon svg {
  min-width: var(--size-16);
  max-width: var(--size-16);
  min-height: var(--size-16);
  max-height: var(--size-16);
}

.alert-item.success .icon {
  background: var(--success-green);
}

.alert-item.success .icon svg {
  fill: var(--white);
}

.alert-item.error .icon {
  background: var(--error-red);
}

.alert-item.error .icon svg {
  fill: var(--white);
}

.alert-item.pending .icon {
  background: var(--dark-yellow);
}

.alert-item.pending .icon svg {
  fill: var(--black);
}

.alert-item.loading {
  background: var(--lightest-grey);
  border-radius: var(--border-circle);
  padding: var(--size-12);
}

.alert-item .message {
  display: flex;
  align-items: center;
  min-height: var(--size-32);
  text-align: start;
}

.loader {
  display: inline-block;
  position: relative;
  width: var(--size-24);
  height: var(--size-24);
}
.loader div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid var(--grey);
  border-radius: var(--border-circle);
  animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: var(--grey) transparent transparent transparent;
}
.loader div:nth-child(1) {
  animation-delay: -0.45s;
}
.loader div:nth-child(2) {
  animation-delay: -0.3s;
}
.loader div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 767px) {
  .alert-item {
    min-width: fit-content;
    max-width: calc(100% - var(--size-32));
    width: max-content;
  }
}
</style>
