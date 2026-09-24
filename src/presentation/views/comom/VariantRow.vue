<script setup lang="ts">
import { Dot, Ellipsis } from 'lucide-vue-next';
import logo from '../../../assets/logo.png';

defineProps<{
    variant: {
        id: string;
        label: string;
        subtitle: string;
        price: number;
        status: string;
        is_default?: boolean;
        is_popular?: boolean;
    };
    image: string;
}>();
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = logo;
};
</script>

<template>
    <div 
        class="flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200"
        :class="variant.is_default ? 'bg-[#fffbeb]/60 border-[#fef3c7]' : 'bg-white border-gray-100 hover:border-gray-200'"
    >
        <div class="flex items-center gap-3.5">
            <img :src="image || logo" :alt="variant.label"  @error="handleImageError" class="w-11 h-11 rounded-xl object-cover border border-gray-100" />
            <div class="flex flex-col gap-0.5">
                <div class="flex items-center gap-2">
                    <span class="text-sm font-bold text-gray-900">{{ variant.label }}</span>
                    <span v-if="variant.is_popular" class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#F5BE18]/20 text-[#92400e]">
                        Popular
                    </span>
                </div>
                <span class="text-xs text-gray-400">{{ variant.subtitle }}</span>
            </div>
        </div>

        <div class="flex items-baseline gap-1">
            <span class="text-[10px] font-semibold text-gray-400">$</span>
            <span class="text-sm font-extrabold text-gray-900">{{ variant.price }}</span>
            
        </div>

        <div class="flex items-center gap-6">
            <div v-if="variant.status === 'available'" class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ecfdf5] border border-[#a7f3d0]">
                <Dot :size="16" class="text-[#065f46]" />
                <span class="text-xs font-semibold text-[#065f46]">Available</span>
            </div>
            <div v-else class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fef2f2] border border-[#fecaca]">
                <Dot :size="16" class="text-[#991b1b]" />
                <span class="text-xs font-semibold text-[#991b1b]">Unavailable</span>
            </div>

            <!-- <button class="text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
                <Ellipsis :size="18" />
            </button> -->
        </div>
    </div>
</template>