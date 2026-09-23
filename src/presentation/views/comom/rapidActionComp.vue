<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
    icon: Component;
    name: string;
    color?: string;
    iconColor?: string;
    backColor?: string;
    borderColor?: string;
    click?: () => void;
}>();
</script>

<template>
    <div 
        @click="click"
        class="inline-flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer border shadow-xs hover:shadow-sm"
        :style="{ 
            backgroundColor: backColor || '#ffffff',
            borderColor: borderColor || '#f3f4f6',
            color: color || '#1f2937'
        }"
    >
        <div class="flex items-center justify-center flex-shrink-0">
            <component 
                :is="icon" 
                :size="18" 
                :style="{ color: iconColor || color || '#4b5563' }" 
            />
        </div>

        <span class="text-xs font-semibold tracking-wide">
            {{ name }}
        </span>
    </div>
</template>