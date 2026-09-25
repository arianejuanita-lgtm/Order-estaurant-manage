<script setup lang="ts">
import { Button } from "@/components/ui/button";

defineProps<{
    label: string;
    isActive: boolean;
    onClick: () => void;
}>();
</script>

<template>
    <Button 
        type="button"
        variant="ghost"
        @click="onClick"
        class="px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer h-auto"
        :class="isActive ? 'bg-[#F5BE18] hover:bg-[#E5AE08] text-black shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 bg-transparent border-0'"
    >
        {{ label }}
    </Button>
</template>