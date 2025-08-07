<template>
  <div class="form-group">
    <label v-if="label" :for="id" class="label">{{ label }}</label>

    <Input
      :id="id"
      :type="type"
      :modelValue="modelValue"
      @update:modelValue="(value) => emit('update:modelValue', value)"
    />

    <span v-if="error" class="error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import Input from "@/components/atoms/Form/Input.vue";

const { label, id, type, modelValue, error } = defineProps<{
  label?: string;
  id?: string;
  type?: string;
  modelValue: string;
  error?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>
