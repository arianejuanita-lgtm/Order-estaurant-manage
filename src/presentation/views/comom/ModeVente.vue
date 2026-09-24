<script setup lang="ts">
import { ToggleLeft, ToggleRight } from 'lucide-vue-next';
import type { Component } from 'vue';

defineProps<{
    modelValue: boolean; 
    icon: Component;
    title: string;
}>();

defineEmits(['update:modelValue']);
</script>

<template>
    <div 
        @click="$emit('update:modelValue', !modelValue)"
        class="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all shadow-sm"
    >
        <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-10 h-10 bg-amber-50 text-amber-400 rounded-full shrink-0">
               <component :is="icon" class="w-5 h-5" />
            </div>
            <span class="text-sm font-semibold text-gray-800">{{ title }}</span>
        </div>

        <div>
            <component 
                :is="modelValue ? ToggleRight : ToggleLeft" 
                :size="32"
                :stroke-width="1.8"
                class="transition-colors"
                :class="modelValue ? 'text-amber-400' : 'text-gray-300'" 
            />
        </div>
    </div>
</template>