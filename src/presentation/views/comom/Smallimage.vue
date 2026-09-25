<script lang="ts" setup>
import logo from '../../../assets/logo.png';
// import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"

defineProps<{
    gallery: string[];
}>();

const emit = defineEmits<{
    (e: 'select-image', url: string): void;
}>();

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = logo;
};
</script>

<template>
    <div class="flex items-center gap-3 overflow-x-auto py-1 scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div 
            v-for="(gal, index) in gallery" 
            :key="index" 
            class="flex-shrink-0 cursor-pointer transition-transform hover:scale-105"
            @click="emit('select-image', gal)"
        >
            <img :src="gal || logo" alt="Gallery image" @error="handleImageError" class="w-[50px] h-[50px] object-cover rounded-xl shadow-xs border border-gray-100 hover:border-[#F5BE18]" />    
        </div>
    </div>
</template>