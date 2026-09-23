<script setup lang="ts">
defineProps<{
    label: string;
    isActive: boolean;
    onClick: () => void;
}>();
</script>

<template>
    <button 
        @click="onClick"
        class="px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer"
        :class="isActive ? 'bg-[#F5BE18]  shadow-sm' : 'text-gray-500 hover:text-gray-900 bg-transparent'"
    >
        {{ label }}
    </button>
</template>