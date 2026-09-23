<script lang="ts" setup>
import { ArrowLeft } from 'lucide-vue-next';

withDefaults(
    defineProps<{
        label?: string;
    }>(),
    {
        label: 'Back'
    }
);
</script>

<template>
    <button 
        type="button"
        class="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-5 py-2.5 rounded-xl transition-all cursor-pointer"
    >
        <ArrowLeft class="w-4 h-4" />
        <span>{{ label }}</span>
    </button>
</template>