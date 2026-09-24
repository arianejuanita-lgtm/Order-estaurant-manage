<script setup lang="ts">
import { ref } from 'vue';
import { Field } from 'vee-validate';
import { Image as ImageIcon, Upload } from 'lucide-vue-next';

defineProps<{
  label: string;
  idu: string;
  name: string;
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const fileName = ref<string>('');

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    fileName.value = file.name; 
    
    const localUrl = URL.createObjectURL(file);
    emit('update:modelValue', localUrl);
  }
};
</script>

<template>
  <div class="flex flex-col flex-1 mb-4">
    <label class="font-semibold text-sm text-gray-800 mb-1.5 flex items-center gap-2">
      <ImageIcon class="w-4 h-4 text-amber-400" />
      {{ label }}
    </label>
    
    <div class="flex items-center gap-3">
      <label 
        :for="idu" 
        class="px-4 py-2.5 bg-white hover:bg-amber-50/50 hover:border-amber-400 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:text-amber-400 cursor-pointer transition-all duration-200 shadow-2xs inline-flex items-center gap-2"
      >
        <Upload class="w-4 h-4 text-gray-500" />
        <span>Choose an image</span>
      </label>
      
      <span class="text-sm text-gray-500 truncate max-w-xs">
        {{ fileName || 'No file chosen' }}
      </span>

      <input
        type="file"
        :id="idu"
        accept="image/*"
        @change="handleFileChange"
        class="hidden"
      />
    </div>
    
    <Field type="hidden" :name="name" :model-value="modelValue" />
  </div>
</template>