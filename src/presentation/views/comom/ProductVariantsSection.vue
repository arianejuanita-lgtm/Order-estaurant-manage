<script setup lang="ts">
import VariantRow from './VariantRow.vue';
import { Plus } from 'lucide-vue-next';

defineProps<{
    item: {
        image: string;
        variants: Array<{
            id: string;
            label: string;
            subtitle: string;
            price: number;
            status: string;
            is_default?: boolean;
            is_popular?: boolean;
        }>;
        [key: string]: any;
    };
}>();
</script>

<template>
    <div class="flex flex-col gap-5 bg-white p-6 rounded-3xl  shadow-sm">
        <div class="flex items-center justify-between">
            <div class="flex flex-col gap-1">
                <h2 class="text-base font-bold text-gray-900">Product Variants</h2>
                <p class="text-xs text-gray-400">This product is available in multiple sizes with different prices.</p>
            </div>

            <!-- <button class="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#fffbeb] border border-[#fef3c7] text-[#92400e] text-xs font-bold hover:bg-[#fde68a]/50 transition-all cursor-pointer">
                <Plus :size="16" class="text-[#F5BE18]" />
                Add variant
            </button> -->
        </div>

        <div class="w-full overflow-x-auto whitespace-nowrap scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div class="min-w-[500px] flex flex-col gap-3">
                <div class="grid grid-cols-3 text-xs font-semibold text-gray-400 px-3">
                    <span>Size</span>
                    <span class="text-center">Price</span>
                    <span class="text-right">Status</span>
                </div>

                <div class="flex flex-col gap-2.5">
                    <VariantRow 
                        v-for="variant in item.variants" 
                        :key="variant.id" 
                        :variant="variant" 
                        :image="item.image" 
                    />
                </div>
            </div>
        </div>
    </div>
</template>