<script setup lang="ts">
import { ToggleLeft, ToggleRight } from 'lucide-vue-next';
import type { Component } from 'vue';

defineProps<{
    modelValue: boolean; 
    title: string;
    description: string;
    icon?: Component; 
}>();

defineEmits(['update:modelValue']);
</script>

<template>
    <div 
        @click="$emit('update:modelValue', !modelValue)"
        class="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all shadow-sm"
    >
        <div class="flex flex-col gap-0.5">
            <span class="text-sm font-semibold text-gray-800">{{ title }}</span>
            <span class="text-xs text-gray-500">{{ description }}</span>
        </div>

        <div>
            <component 
                :is="modelValue ? ToggleRight : ToggleLeft" 
                class="w-7 h-7 transition-colors"
                :class="modelValue ? 'text-amber-400' : 'text-gray-300'" 
            />
        </div>
    </div>
</template>