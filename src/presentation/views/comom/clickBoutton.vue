<script setup lang="ts">
import type { Component } from 'vue';
import { Button } from "@/components/ui/button";

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
  <Button 
    type="button"
    @click="click" 
    variant="default"
    class="flex items-center justify-center shrink-0 gap-2 bg-amber-400 border border-amber-400 font-bold text-black text-sm transition-colors hover:bg-amber-500 shadow-xs cursor-pointer h-auto"
    :class="size"
  >
    <component :is="icon" v-if="icon" class="w-4 h-4 shrink-0" />
    <span v-if="title" class="max-[420px]:hidden">{{ title }}</span>
  </Button>
</template>