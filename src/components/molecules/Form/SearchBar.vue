<template>
  <div class="search-bar" ref="rootEl">
    <div class="input-group">
      <span class="icon-left">
        <img
          src="@/assets/images/general/magnify-glass.png"
          alt="magnify-glass"
        />
      </span>
      <Input
        :id="id"
        type="text"
        :modelValue="modelValue"
        @update:modelValue="onInput"
        class="page-input"
        :placeholder="placeholder"
        @focus="openDropdown"
      />
      <span class="icon-right" v-if="modelValue" @click="clearValue">
        <img
          src="@/assets/images/general/close-button.png"
          alt="close-button"
        />
      </span>
    </div>

    <SearchDropdown
      :isDropdownOpen="dropdownOpen"
      :cities="cities"
      :modelValue="modelValue"
      @updateCity="handleSelect"
      @closeDropdown="closeDropdown"
    >
      <div class="input-group dropdown-input-group">
        <span class="icon-left">
          <img
            src="@/assets/images/general/magnify-glass.png"
            alt="magnify-glass"
          />
        </span>
        <Input
          :id="id"
          type="text"
          :modelValue="modelValue"
          @update:modelValue="onInput"
          :placeholder="placeholder"
          @focus="openDropdown"
        />
        <span class="icon-right" v-if="modelValue" @click.stop="clearValue">
          <img
            src="@/assets/images/general/close-button.png"
            alt="close-button"
          />
        </span>
      </div>
    </SearchDropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, computed } from "vue";
import Input from "@/components/atoms/Form/Input.vue";
import SearchDropdown from "@/components/atoms/Dropdown/SearchDropdown.vue";
import type { CitySuggestion } from "@/types/weather";

const props = defineProps<{
  modelValue: string;
  cities: CitySuggestion[];
  placeholder?: string;
  id?: string;
  dropdownClass?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", v: string): void;
  (e: "search", v: string): void;
  (e: "select", city: CitySuggestion): void;
  (e: "open"): void;
  (e: "close"): void;
}>();

const isOpen = ref(false);
const isMobile = ref(false);
const rootEl = ref<HTMLElement | null>(null);

function detectMobile() {
  // Below 768px considered mobile;
  isMobile.value = window.matchMedia("(max-width: 768px)").matches;
}

function openDropdown() {
  isOpen.value = true;
  emit("open");
}

function closeDropdown() {
  isOpen.value = false;
  emit("close");
}

function onInput(v: string) {
  emit("update:modelValue", v);
  emit("search", v);
  if (!isOpen.value) isOpen.value = true;
}

function handleSelect(city: CitySuggestion) {
  emit("select", city);
  closeDropdown();
}

// Desktop-only auto open/close based on suggestions + length
watch([() => props.cities.length, () => props.modelValue], ([len, mv]) => {
  if (isMobile.value) return;
  if (len > 0 && mv.length >= 2) isOpen.value = true;
  if (len === 0) isOpen.value = false;
});

// Track for the dropdown visibility between dekstop and mobile
const dropdownOpen = computed(() => {
  if (isMobile.value) {
    // Mobile: show if focused/open, regardless of value or results
    return isOpen.value;
  }
  // Desktop: original rule
  return (
    isOpen.value && props.cities.length > 0 && props.modelValue.length >= 2
  );
});

function handleClickOutside(e: MouseEvent) {
  const el = rootEl.value;
  if (el && !el.contains(e.target as Node)) closeDropdown();
}

function clearValue() {
  emit("update:modelValue", "");
  emit("search", "");
  console.log("clear");
}

onMounted(() => {
  detectMobile();
  window.addEventListener("resize", detectMobile);
  window.addEventListener("orientationchange", detectMobile);
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", detectMobile);
  window.removeEventListener("orientationchange", detectMobile);
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.search-bar {
  position: relative;
  width: 100%;
}

.search-bar input {
  height: var(--size-40);
  width: 100%;
  border-radius: var(--border-sm);
  background: var(--light-grey);
  padding: var(--size-12) var(--size-32);
  outline: none;
  border: unset;
}

.search-input {
  width: 100%;
}

.input-group {
  position: relative;
}

.input-group .icon-left {
  width: var(--size-16);
  height: var(--size-16);
  position: absolute;
  bottom: var(--size-16);
  pointer-events: none;
  top: var(--size-12);
  left: var(--size-12);
}

.input-group .icon-right {
  width: var(--size-16);
  height: var(--size-16);
  position: absolute;
  bottom: var(--size-16);
  top: var(--size-12);
  right: var(--size-12);
  cursor: pointer;
}

.input-group span img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  vertical-align: unset;
}

@media (min-width: 1023px) {
  :deep(.dropdown-input-group) {
    display: none;
  }
}
</style>
