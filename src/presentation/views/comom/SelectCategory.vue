<script setup lang="ts">
import { Field } from 'vee-validate';
import { LayoutGrid } from 'lucide-vue-next';

interface SelectOption {
  [key: string]: any;
}

defineProps<{
  id: string;              
  label: string;            
  placeholder: string;      
  options: SelectOption[];  
  modelValue: string;       
  itemLabel: string;        
  itemKey: string;          
  itemValue: string;   
  name: string;     
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <div class="flex flex-col flex-1 mb-4">
    <label :for="id" class="font-semibold text-sm text-gray-800 mb-1.5 flex items-center gap-2">
      <LayoutGrid class="w-4 h-4 text-amber-400" />
      {{ label }}
    </label>
    
    <Field
      :id="id"
      :model-value="modelValue"
      :name="name"
      as="select"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      class="border border-gray-200 p-3 rounded-xl text-sm bg-white outline-none hover:border-amber-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200 cursor-pointer shadow-2xs"
    >
      <option disabled value="" class="text-gray-400">{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option[itemKey]"
        :value="option[itemValue]"
      >
        {{ option[itemLabel] }}
      </option>
    </Field>
  </div>
</template>