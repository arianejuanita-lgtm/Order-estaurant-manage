<script setup lang="ts">
import { Field } from 'vee-validate';
import { ListChecks } from 'lucide-vue-next';

interface CheckboxOption {
  [key: string]: any; 
}

defineProps<{
  label: string;            
  name: string;             
  options: CheckboxOption[]; 
  modelValue: any[];        
  itemLabel: string;        
  itemKey: string;          
}>();

defineEmits<{
  (e: 'update:modelValue', value: any[]): void;
}>();
</script>

<template>
  <div class="flex flex-col flex-1 mb-4">
    <label class="font-semibold text-sm text-gray-800 mb-2 flex items-center gap-2">
      <ListChecks class="w-4 h-4 text-amber-400" />
      {{ label }}
    </label>
    
    <div class="flex flex-wrap gap-2.5">
      <label
        v-for="option in options"
        :key="option[itemKey]"
        class="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm cursor-pointer transition-all duration-200 select-none shadow-2xs"
        :class="[
          modelValue.includes(option[itemLabel])
            ? 'bg-amber-50/70 border-amber-400  font-medium ring-2 ring-amber-100 shadow-xs'
            : 'bg-white border-gray-200 text-gray-600 hover:border-amber-400 hover:bg-amber-50/20'
        ]"
      >
        <Field
          type="checkbox"
          :name="name"
          :value="option[itemLabel]"
          :model-value="modelValue"
          @update:model-value="$emit('update:modelValue', $event)"
          class="hidden"
        />

        <span 
          class="w-3 h-3  transition-all duration-200 flex items-center justify-center"
          :class="[
            modelValue.includes(option[itemLabel]) 
              ? 'bg-amber-400 scale-105 shadow-xs ring-2 ring-amber-200' 
              : 'bg-gray-300 group-hover:bg-amber-400'
          ]"
        ></span>

        <span class="transition-colors">{{ option[itemLabel] }}</span>
      </label>
    </div>
  </div>
</template>