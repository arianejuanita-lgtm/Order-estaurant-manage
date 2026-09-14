<script setup lang="ts">
defineProps<{
  title: string;
  isSelected?: boolean;
  ontap?: () => void;
}>();
</script>

<template>
  <button 
    @click="ontap"
    class="flex items-center justify-center border px-2.5 rounded-[20px] h-[25px] cursor-pointer font-bold bg-transparent transition-all duration-200 ease-in-out"
    :class="isSelected ? 'border-[#F5BE18]' : 'border-gray-500'"
  >
    {{ title }}
  </button>
</template>
