<script setup lang="ts">
import { Field } from 'vee-validate';
import { PenLine } from 'lucide-vue-next';

defineProps<{
    labelFor?: string;
    title?: string;
    typeField: string;
    name: string;
    step?: number | string;
    idu: string;
    modelValue: string | number; 
    min?: string | number;
    max?: string | number;
}>();

defineEmits(['update:modelValue']);
</script>

<template>
  <div class="flex flex-col flex-1 mb-4">
    <label :for="labelFor" class="font-semibold text-sm text-gray-800 mb-1.5 flex items-center gap-2">
      <PenLine class="w-4 h-4 text-amber-400" />
      {{ title }}
    </label>
    <Field 
      :type="typeField" 
      :name="name" 
      :step="step" 
      :id="idu" 
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      :min="min"
      :max="max"
      class="border border-gray-200 bg-white p-3 rounded-xl text-sm outline-none hover:border-amber-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200 shadow-2xs"
    />
  </div>
</template>