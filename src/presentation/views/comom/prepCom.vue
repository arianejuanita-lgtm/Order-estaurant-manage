<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
    icon: Component;
    title: string;
    label?: string;
    item?: number | string;
    colorIcone?: string;
}>();
</script>

<template>
    <div class="flex items-center gap-1.5 bg-white border border-gray-100 rounded-xl px-2 py-1.5 hover:shadow-sm transition-all duration-200">
        <div 
            class="flex items-center justify-center w-6 h-6 rounded-md transition-colors flex-shrink-0"
            :style="{ 
                backgroundColor: colorIcone ? `${colorIcone}15` : '#f3f4f6',
                color: colorIcone || '#6b7280' 
            }"
        >
            <component :is="icon" :size="12" />
        </div>

        <div class="flex flex-col">
            <p class="text-[9px] font-semibold text-gray-400 uppercase tracking-wider leading-none mb-0.5">{{ title }}</p>
            <div class="flex items-baseline gap-1">
                <span class="text-xs font-bold text-gray-900 leading-tight">{{ item }}</span>
                <span class="text-[10px] font-medium text-gray-500 leading-tight">{{ label }}</span>
            </div>
        </div>
    </div>
</template>