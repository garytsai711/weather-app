<template>
  <div class="form-group">
    <label :for="id" class="floated">{{ label }}</label>
    <Input
      :id="id"
      :type="type"
      :modelValue="modelValue"
      @update:modelValue="onInput"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :class="[{ 'is-focused': isFocused, 'has-value': modelValue }]"
      autocomplete="off"
      :maxLength="maxLength"
      :disabled="disabled"
    />
    <span v-if="error" class="error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Input from "@/components/atoms/Form/Input.vue";

defineProps<{
  label?: string;
  id?: string;
  type?: string;
  modelValue: string;
  error?: string;
  disabled?: boolean;
  maxLength?: number;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const isFocused = ref(false);
const onInput = (value: string) => {
  emit("update:modelValue", value);
};
</script>

<style scoped>
.form-group {
  position: relative;
  margin-bottom: var(--size-12);
}

.form-group label {
  font-size: var(--text-xxs);
  color: var(--grey);
  position: absolute;
  top: var(--size-12);
  left: var(--size-12);
  pointer-events: none;
}

.form-group input {
  width: 100%;
  border-radius: 8px;
  outline: none;
  font-size: var(--text-sm);
  font-weight: var(--semi-bold);
  padding: var(--size-12);
  letter-spacing: 0.8px;
  background: none;
  font-size: var(--text-sm);
  height: 50px;
  border: none !important;
  border-radius: var(--border-sm);
  padding: var(--size-12);
  padding-top: var(--size-24);
  box-shadow: inset 0 0 0 1px #e5e5e5;
  transition: box-shadow 0.3s ease-in-out;
  color: var(--black);
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.form-group input:disabled {
  background: var(--light-grey);
}

.form-group input:disabled,
.form-group input:disabled:hover,
.form-group input:disabled:focus {
  box-shadow: unset !important;
  cursor: text;
}

.form-group .error {
  color: var(--error-red);
  font-size: var(--text-sm);
  margin-top: var(--size-4);
  display: block;
}

.form-group input:hover {
  box-shadow: inset 0 0 0 2px #e5e5e5;
}

.form-group input:focus {
  box-shadow: inset 0 0 0 2px var(--black);
  outline: none !important;
}
</style>
