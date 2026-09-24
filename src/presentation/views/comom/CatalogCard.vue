<script setup lang="ts">
import type { Component } from 'vue';
import { ArrowRight } from 'lucide-vue-next';

defineProps<{
  title: string;
  id: string | number;
  icon?: Component;
  colorTheme?: 'amber' | 'emerald' | 'blue';
}>();
</script>

<template>
  <div 
    class="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between transition-all hover:shadow-md group cursor-pointer"
    :class="{
      'hover:border-amber-400': colorTheme === 'amber' || !colorTheme,
      'hover:border-emerald-400': colorTheme === 'emerald',
      'hover:border-blue-400': colorTheme === 'blue',
    }"
  >
    <div class="flex items-center gap-3.5">
      <div 
        class="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base transition-colors"
        :class="{
          'bg-amber-50 text-amber-600 group-hover:bg-amber-400 group-hover:text-gray-900': colorTheme === 'amber' || !colorTheme,
          'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-400 group-hover:text-gray-900': colorTheme === 'emerald',
          'bg-blue-50 text-blue-600 group-hover:bg-blue-400 group-hover:text-gray-900': colorTheme === 'blue',
        }"
      >
        <component v-if="icon" :is="icon" class="w-5 h-5" />
        <span v-else>{{ title ? title.charAt(0).toUpperCase() : 'C' }}</span>
      </div>

      <div class="flex flex-col">
        <h3 class="text-sm font-bold text-gray-900">{{ title }}</h3>
        <span class="text-[11px] text-gray-400">ID: {{ id }}</span>
      </div>
    </div>
    
    <!-- <div 
      class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 transition-colors"
      :class="{
        'group-hover:bg-amber-100 group-hover:text-amber-700': colorTheme === 'amber' || !colorTheme,
        'group-hover:bg-emerald-100 group-hover:text-emerald-700': colorTheme === 'emerald',
        'group-hover:bg-blue-100 group-hover:text-blue-700': colorTheme === 'blue',
      }"
    >
      <ArrowRight class="w-4 h-4" />
    </div> -->
  </div>
</template>