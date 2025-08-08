<template>
  <div class="dropdown-menu" :class="[{ open: isDropdownOpen }]">
    <!-- Slot for search input -->
    <div class="search-slot">
      <slot />
    </div>

    <!-- Before typing -->
    <div v-if="modelValue.length < 2" class="empty">
      Where do you want to check the weather?
    </div>

    <!-- No results -->
    <div v-else-if="cities.length === 0" class="empty">
      No matching locations
    </div>
    <div class="body" v-else>
      <div
        v-for="item in cities"
        :key="`${item.name}-${item.lat}-${item.lon}`"
        @click="selectCity(item)"
        class="item"
      >
        <div class="item__name">{{ item.name }},</div>
        <div class="item__meta">
          <span>{{ item.country }} {{ item.state }}</span>
        </div>
      </div>
    </div>
  </div>

  <div
    class="backdrop"
    @click="handleClose"
    :class="{ open: isDropdownOpen }"
  ></div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useStore } from "@/stores/useStore";

const props = defineProps({
  isDropdownOpen: Boolean,
  cities: { type: Array, default: () => [] },
  modelValue: String,
});

const emit = defineEmits(["updateCity", "closeDropdown"]);
const store = useStore();

const selectCity = (item) => {
  emit("updateCity", item);
  emit("closeDropdown");
};

const handleClose = () => {
  emit("closeDropdown");
};
</script>

<style scoped>
.dropdown-menu {
  visibility: hidden;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1054;
  margin: 0;
  width: 100%;
  height: fit-content;
  background: var(--white);
  border-radius: var(--border-lg);
  box-shadow: 0 0 40px rgba(69, 71, 69, 0.2);
  transition: transform 0.15s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: var(--size-16);
  display: flex;
  flex-direction: column;
}

.dropdown-menu.open {
  visibility: visible;
}

.dropdown-menu .body {
  height: calc(100% - 16px);
}

.dropdown-menu .item {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 10px 0;
  border-bottom: 1px solid #d4d4d4;
  font-size: var(--text-sm);
  cursor: pointer;
}

.dropdown-menu .item:last-child {
  border-bottom: unset;
  padding-bottom: 0;
}

.dropdown-menu .item__name {
  font-weight: var(--semi-bold);
}

.dropdown-menu .item__meta {
  font-weight: var(--semi-bold);
  color: #545454;
}

/* Custom Scrollbar */
.dropdown-menu .body::-webkit-scrollbar {
  width: var(--size-8);
  cursor: pointer;
}

.dropdown-menu .body::-webkit-scrollbar-thumb {
  background-color: var(--light-grey);
  border-radius: var(--border-lg);
  cursor: pointer;
}

.dropdown-menu .body::-webkit-scrollbar-thumb:hover {
  background-color: var(--slate-blue);
}

.dropdown-menu .body::-webkit-scrollbar-track {
  background-color: var(--white);
}

.empty {
  font-size: var(--text-xs);
  color: var(--black);
  margin-top: var(--size-24);
  text-align: center;
}

@media (max-width: 1023px) {
  .dropdown-menu {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: unset;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 0px;
    margin: auto;
    transform-origin: bottom;
    transition: visibility 0.3s, transform 0.3s;
    gap: var(--size-8);
  }

  .dropdown-menu:not(.open) {
    transform: scaleX(0);
    transform-origin: right;
  }

  .dropdown-menu.open {
    animation: menuSlideIn 0.3s ease-out forwards;
  }

  @keyframes menuSlideIn {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes menuSlideOut {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(100%);
    }
  }

  .dropdown-menu .header {
    display: flex;
    justify-content: end;
    padding: var(--size-8);
  }

  .dropdown-menu .header svg {
    min-width: var(--size-16);
    max-width: var(--size-16);
    min-height: var(--size-16);
    max-height: var(--size-16);
  }

  .dropdown-menu .body {
    margin-bottom: var(--size-8);
  }
}

@media (min-width: 1023px) {
  .backdrop.open {
    display: none !important;
  }
}
</style>
