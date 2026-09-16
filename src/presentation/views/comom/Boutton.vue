<script setup lang="ts">
defineProps<{
  title: string,
  haut?: number,
  type?: string,
  class?: string
}>();
</script>

<template>
  <button 
    :style="{ height: (haut || 50) + 'px' }"
    :type="(type as any)"
    class="flex items-center justify-center bg-amber-400 border border-amber-400 px-5 rounded-[20px] cursor-pointer font-bold text-black transition-colors hover:bg-amber-500"
  >
    {{ title }}
  </button>
</template>