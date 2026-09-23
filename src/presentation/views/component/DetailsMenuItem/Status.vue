<script setup lang="ts">
import { MenuItem } from '@/domain/entities/MenuItem';
import { ToggleRight, ToggleLeft, CircleCheckBig } from 'lucide-vue-next';

defineProps<{
    item: MenuItem;
}>();
</script>

<template>
    <div class="flex flex-col gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        
        <div class="flex items-center justify-between">
            <p class="text-sm font-bold text-gray-800">Product Status</p>
            
            <div class="flex items-center gap-2">
                <template v-if="item.isAvailable">
                    <ToggleRight :size="28" fill="#F5BE18" class="text-[#F5BE18]" :stroke-width="1" />
                    <span class="text-sm font-semibold text-gray-800">Available</span>
                </template>

                <template v-else>
                    <ToggleLeft :size="28" class="text-gray-400" />
                    <span class="text-sm font-semibold text-gray-400">Unavailable</span>
                </template>
            </div>
        </div>

        <div class="flex items-center gap-3 px-4 py-3 bg-[#fffbeb]/60 border border-[#fef3c7] rounded-xl">
            <CircleCheckBig :size="18" class="text-[#F5BE18] flex-shrink-0" />
            <p class="text-xs font-medium text-gray-700">Product is visible in menu list .</p>
        </div>

    </div>
</template>