<template>
  <input
    :id="id"
    type="text"
    inputmode="numeric"
    :value="modelValue"
    @input="updateValue"
    class="input"
    autocomplete="off"
    :maxlength="maxLength"
    :placeholder="placeholder"
    :disabled="disabled"
  />
</template>

<script setup lang="ts">
defineProps<{
  id?: string;
  modelValue: string;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

function updateValue(event: Event) {
  const el = event.target as HTMLInputElement;
  const digitsOnly = el.value.replace(/\D/g, "");
  // Visually set the input to only digits (blocks letters immediately)
  if (el.value !== digitsOnly) el.value = digitsOnly;
  emit("update:modelValue", digitsOnly);
}
</script>

<style scoped></style>
