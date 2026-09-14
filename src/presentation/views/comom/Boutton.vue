<script setup lang="ts">
// Correction des types en minuscules (bonnes pratiques TypeScript/Vue)
defineProps<{
  title: string,
  haut: number
}>()
</script>

<template>
  <button 
    :style="{ height: haut + 'px' }"
    class="flex items-center justify-center bg-[#F5BE18] border border-[#F5BE18] px-5 rounded-[20px] cursor-pointer font-bold text-black"
  >
    {{ title }}
  </button>
</template>
