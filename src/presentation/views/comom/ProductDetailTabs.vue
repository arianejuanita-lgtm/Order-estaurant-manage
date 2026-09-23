<script setup lang="ts">
import { ref } from 'vue';
import { MenuItem } from '@/domain/entities/MenuItem';
import TabButton from './TabButton.vue';
import ProductVariantsSection from './ProductVariantsSection.vue';

defineProps<{
    item: MenuItem;
}>();

const activeTab = ref('variants');
</script>

<template>
    <div class="flex flex-col gap-6 w-full">
 <div class="flex items-center gap-3 bg-gray-50/80 p-1 rounded-2xl w-full md:w-fit overflow-x-auto whitespace-nowrap border border-gray-100 scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
    <TabButton label="Variants" :isActive="activeTab === 'variants'" @click="activeTab = 'variants'" />
    <TabButton label="Ingredients" :isActive="activeTab === 'ingredients'" @click="activeTab = 'ingredients'" />
    <TabButton label="Advanced Info" :isActive="activeTab === 'advanced'" @click="activeTab = 'advanced'" />
    <TabButton label="Customer Reviews" :isActive="activeTab === 'reviews'" @click="activeTab = 'reviews'" />
</div>

        <div class="transition-all duration-300">
            <div v-if="activeTab === 'variants'">
                <ProductVariantsSection :item="item" />
            </div>

            <div v-else-if="activeTab === 'ingredients'" class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-4">
                <h2 class="text-base font-bold text-gray-900">Product Ingredients</h2>
                <!-- <p class="text-xs text-gray-500 leading-relaxed">{{ item.description }}</p> -->
            </div>

            <div v-else-if="activeTab === 'advanced'" class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-4">
                <h2 class="text-base font-bold text-gray-900">Advanced Information & Stock</h2>
                <div class="grid grid-cols-2 gap-4 text-xs">
                    <div class="p-3 bg-gray-50 rounded-xl">
                        <span class="text-gray-400 block mb-1">Applicable VAT</span>
                        <span class="font-bold text-gray-800">{{ item.vat }} %</span>
                    </div>
                    <div class="p-3 bg-gray-50 rounded-xl">
                        <span class="text-gray-400 block mb-1">Preparation Time</span>
                        <span class="font-bold text-gray-800">{{ item.preparationTime }} min</span>
                    </div>
                </div>
            </div>

            <div v-else-if="activeTab === 'reviews'" class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-4">
                <h2 class="text-base font-bold text-gray-900">Customer Reviews</h2>
                <div class="flex items-center gap-2">
                    <span class="text-2xl font-extrabold text-gray-900">{{ item.rating }}</span>
                    <span class="text-xs text-gray-400">/ 5 ({{ item.reviews }} reviews)</span>
                </div>
            </div>
        </div>
    </div>
</template>