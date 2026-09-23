<script lang="ts" setup>
defineProps<{
    gallery: string[];
}>();
</script>

<template>
    <div class="flex items-center gap-3 overflow-x-auto py-1">
        <div v-for="(gal, index) in gallery" :key="index" class="flex-shrink-0">
            <img :src="gal" alt="Gallery image" class="w-[50px] h-[50px] object-cover rounded-xl shadow-xs border border-gray-100" />    
        </div>
    </div>
</template>