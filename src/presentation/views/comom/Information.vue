<script setup lang="ts">
import PrepCom from './prepCom.vue';
import { LayoutGrid, HandCoins, ShoppingBag } from 'lucide-vue-next';

defineProps<{
    item: {
        category?: string;
        price?: number;
        isAvailable?: boolean;
        [key: string]: any;
    };
    colorIcone?: string; 
    title?: string;
}>();
</script>

<template>
    <div class="flex flex-col gap-1">
        <h2 v-if="title" class="text-base font-bold text-gray-800 tracking-wide text-[14px]">{{ title }}</h2>
        <div class="flex flex-wrap items-center gap-4">
            <PrepCom 
                title="Category" 
                :item="item.category" 
                :icon="LayoutGrid" 
                :colorIcone="colorIcone"
            />
            
            <PrepCom
                title="Sale Price"
                :item="item.price"
                :icon="HandCoins"
                label="FCFA"
                :colorIcone="colorIcone"
            />
            
            <PrepCom
                title="Disponibility"
                :label="item.isAvailable ? 'Available to sale' : 'Unavailable to sale'"
                :icon="ShoppingBag"
                :colorIcone="colorIcone "
            />
        </div>
    </div>
</template>