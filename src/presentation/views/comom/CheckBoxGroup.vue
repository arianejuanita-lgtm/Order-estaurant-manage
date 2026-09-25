<script setup lang="ts">
import { ListChecks } from 'lucide-vue-next';
import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxOption {
  [key: string]: any; 
}

const props = defineProps<{
  label: string;            
  name: string;            
  options: CheckboxOption[]; 
  modelValue: any[];        
  itemLabel: string;        
  itemKey: string;          
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: any[]): void;
}>();

const toggleOption = (itemValue: string) => {
  const current = [...props.modelValue];
  const index = current.indexOf(itemValue);
  
  if (index > -1) {
    current.splice(index, 1);
  } else {
    current.push(itemValue);
  }
  
  emit('update:modelValue', current);
};
</script>

<template>
  <div class="flex flex-col flex-1 mb-4">
    <label class="font-semibold text-sm text-gray-800 mb-2 flex items-center gap-2">
      <ListChecks class="w-4 h-4 text-amber-400" />
      {{ label }}
    </label>
    
    <div class="flex flex-wrap gap-2.5">
      <div
        v-for="option in options"
        :key="option[itemKey]"
        @click="toggleOption(option[itemLabel])"
        class="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm cursor-pointer transition-all duration-200 select-none shadow-2xs"
        :class="[
          modelValue.includes(option[itemLabel])
            ? 'bg-amber-50/70 border-amber-400 font-medium ring-2 ring-amber-100 shadow-xs'
            : 'bg-white border-gray-200 text-gray-600 hover:border-amber-400 hover:bg-amber-50/20'
        ]"
      >
        <Checkbox 
          :model-value="modelValue.includes(option[itemLabel])"
          @update:model-value="toggleOption(option[itemLabel])"
          class="data-[state=checked]:bg-amber-400 data-[state=checked]:border-amber-400 data-[state=checked]:text-black border-gray-300 transition-all pointer-events-none"
        />

        <span class="transition-colors">{{ option[itemLabel] }}</span>
      </div>
    </div>
  </div>
</template>