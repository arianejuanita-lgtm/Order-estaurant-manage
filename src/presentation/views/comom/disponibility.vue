<script lang="ts" setup>
import {  ToggleLeft, ToggleRight } from 'lucide-vue-next';
defineProps<{
    isAvailable:boolean,
    title:string,
    description?:string
}>();
</script>
<template>
             <div 
                @click="isAvailable = !isAvailable"
                class="flex items-center justify-between p-4 border border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all shadow-sm"
            >
                <div class="flex items-center gap-3">
                    <component 
                        :is="isAvailable ? ToggleRight : ToggleLeft" 
                        class="w-7 h-7 transition-colors"
                        :class="isAvailable ? 'text-amber-500' : 'text-gray-300'" 
                    />
                    <div>
                        <h4 class="text-sm font-bold text-gray-900">{{ title }}</h4>
                        <p class="text-xs text-gray-500">{{ description }}</p>
                    </div>
                </div>
            </div>
</template>