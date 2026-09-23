<script lang="ts" setup>
import type { Component } from 'vue';

defineProps<{
  icon: Component;
  badgeCount?: number;
  label: string;
}>();
</script>

<template>
  <div 
    class="w-[36px] h-[36px] lg:w-[40px] lg:h-[40px] flex items-center justify-center rounded-full cursor-pointer text-[#333] bg-[#f7f7f7] hover:bg-[#F5BE18] hover:text-black hover:-translate-y-[2px] transition-all duration-300 relative"
    :aria-label="label"
  >
    <component :is="icon" class="w-[19px] h-[19px] stroke-[2]" />
    <span 
      v-if="badgeCount !== undefined && badgeCount > 0" 
      class="absolute -top-1 -right-1 bg-[#e85d04] text-white text-[11px] font-bold px-[6px] py-[2px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
    >
      {{ badgeCount }}
    </span>
  </div>
</template>