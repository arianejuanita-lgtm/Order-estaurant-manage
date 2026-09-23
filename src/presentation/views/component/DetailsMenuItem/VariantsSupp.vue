<script setup lang="ts">
import { MenuItem } from '@/domain/entities/MenuItem';
import SuppComp from '../../comom/SuppComp.vue';
import ProductDetailTabs from '../../comom/ProductDetailTabs.vue';

defineProps<{
    item: MenuItem;
}>();
</script>

<template>
    <div>
        <ProductDetailTabs :item="item"/>
    </div>
    <div class="flex flex-col gap-3 bg-white p-5 rounded-2xl ">
        <h2 class="text-sm font-bold text-gray-800 tracking-wide">Supplements</h2>
        
<div class="grid grid-cols-1 md:grid-cols-3 gap-3">
    <div v-for="supp in item.supplements" :key="supp.id" class="w-full">
        <SuppComp :item="supp" />
    </div>
</div>
    </div>
</template>