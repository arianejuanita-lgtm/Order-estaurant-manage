<script setup lang="ts">
import { Supplement } from '@/domain/entities/Supplement';

defineProps<{
    item: Supplement;
}>();
</script>

<template>
    <div class="flex items-center justify-between p-3.5 bg-white border border-gray-100 rounded-2xl shadow-xs hover:border-[#fde68a] transition-all duration-200">
        <div class="flex items-center justify-center w-10 h-10 bg-[#fffbeb] border border-[#fef3c7] rounded-xl text-lg flex-shrink-0">
            {{ item.icon }}
        </div>

        <div class="flex-1 mx-3">
            <p class="text-sm font-semibold text-gray-800 tracking-tight">{{ item.label }}</p>
        </div>

        <div class="flex items-baseline gap-1 bg-[#fffbeb]/60 px-3 py-1.5 rounded-xl border border-[#fef3c7]">
            <span class="text-xs font-extrabold text-[#F5BE18]">+{{ item.price }}</span>
            <span class="text-[10px] font-bold text-gray-400">$</span>
        </div>
    </div>
</template>