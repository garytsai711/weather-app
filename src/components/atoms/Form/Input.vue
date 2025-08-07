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

<style scoped></style>
