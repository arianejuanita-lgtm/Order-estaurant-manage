<script setup lang="ts">
import type { Component } from 'vue';

withDefaults(
  defineProps<{
    click: () => void;
    title?: string;
    icon?: Component;
    size?: string; 
  }>(),
  {
    size: "px-1 sm:px-5 py-2 rounded-[20px]", 
  }
);
</script>

<template>
  <button 
    type="button"
    @click="click" 
    class="flex items-center justify-center shrink-0 gap-2 bg-amber-400 border border-amber-400 font-bold text-black text-sm transition-colors hover:bg-amber-400 shadow-xs cursor-pointer"
    :class="size"
  >
    <component :is="icon" class="w-3 h-5" />
    <span v-if="title" class="max-[420px]:hidden">{{ title }}</span>
  </button>
</template>