<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
  icon: Component;
  title: string;
  description: string;
}>();
</script>

<template>
  <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-start gap-4 transition-all hover:shadow-md">
    <div class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-400 flex items-center justify-center shrink-0">
      <component :is="icon" class="w-6 h-6" />
    </div>
    <div class="flex flex-col gap-1">
      <h3 class="text-sm font-bold text-gray-900">{{ title }}</h3>
      <p class="text-xs text-gray-500 leading-relaxed whitespace-pre-line">
        {{ description }}
      </p>
    </div>
  </div>
</template>