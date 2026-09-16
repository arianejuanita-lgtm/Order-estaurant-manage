<script setup lang="ts">
import { Field } from 'vee-validate';

defineProps<{
  idu: string;              
  title: string;            
  name: string;             
  modelValue: string;       
  rows?: string | number;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <div class="flex flex-col flex-1 mb-4">
    <label :for="idu" class="font-semibold text-sm text-gray-800 mb-1.5">{{ title }}</label>
    
    <Field
      :id="idu"
      :name="name"
      :model-value="modelValue"
      as="textarea"
      @update:model-value="$emit('update:modelValue', $event)"
      class="p-3 border border-gray-200 bg-white rounded-xl text-sm outline-none hover:border-amber-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all duration-200 resize-y h-24 shadow-2xs"
    />
  </div>
</template>