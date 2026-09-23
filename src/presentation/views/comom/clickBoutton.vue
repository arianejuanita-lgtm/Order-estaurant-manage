<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
  click: () => void;
  title?:string;
  icon?:Component
}>();
</script>

<template>
  <button 
    type="button"
    @click="click" 
    class="flex items-center justify-center shrink-0 gap-2 bg-amber-400 border border-amber-400 px-3 sm:px-5 py-2.5 rounded-[20px] cursor-pointer font-bold text-black text-sm transition-colors hover:bg-amber-500 shadow-xs"
  >
    <component :is="icon" class="w-5 h-5" :size="18" />
    <span class="max-[420px]:hidden">{{ title }}</span>
  </button>
</template>
