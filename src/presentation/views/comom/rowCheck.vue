<script setup lang="ts">
import { Field } from 'vee-validate';
import { CheckCircle2 } from 'lucide-vue-next';

defineProps<{
    typeField?: string;
    name: string;
    modelvalue?: boolean;   
    modelValue?: boolean;   
    title: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'update:modelvalue', value: boolean): void;
}>();
</script>

<template>
  <div class="flex flex-row items-center mb-4 w-full">
    <label class="group flex items-center gap-3 cursor-pointer select-none">
      <CheckCircle2 class="w-4 h-4 text-amber-400" />
      <Field 
        type="checkbox"
        :name="name" 
        :value="true"
        :unchecked-value="false"
        :model-value="modelValue ?? modelvalue"
        @update:model-value="(val) => {
          $emit('update:modelValue', val);
          $emit('update:modelvalue', val);
        }" 
        class="w-4 h-4 rounded border-gray-300 text-amber-400 focus:ring-amber-400 accent-amber-400 cursor-pointer transition-all" 
      />
      <span class="font-medium text-sm text-gray-800 group-hover:text-amber-400 transition-colors">
        {{ title }}
      </span>
    </label>
  </div>
</template>