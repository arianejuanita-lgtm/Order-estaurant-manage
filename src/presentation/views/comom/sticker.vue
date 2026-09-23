<script lang="ts" setup>
import type { Component } from 'vue';

defineProps<{
    icon?: Component;
    name?: string;
    color?: string;
    backColor?: string;
    borderColor?: string;
}>();
</script>

<template>
    <div 
        class="flex items-center gap-1 px-4 py-2 rounded-xl  "
        :style="{ 
            backgroundColor: backColor || '#f9fafb',
            borderColor: borderColor || '#f3f4f6' 
        }"
    >
            <component :is="icon" :size="20" :style="{ color: color || '#374151' }" />
          
        <p class="text-sm font-semibold tracking-wide" :style="{ color: color || '#1f2937' }">
            {{ name }}
        </p>
    </div>
</template>