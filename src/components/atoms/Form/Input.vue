<template>
  <input
    :id="id"
    :type="type"
    :value="modelValue"
    @input="updateValue"
    class="input"
  />
</template>

<script setup lang="ts">
defineProps<{
  id?: string;
  type?: string;
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const updateValue = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>

<style scoped>
.input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  font-size: 1rem;
}
</style>
