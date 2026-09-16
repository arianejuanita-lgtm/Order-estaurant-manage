<script setup lang="ts">
import Categorie from './component/filters/categorie.vue';
import Dietary from './component/filters/dietary.vue';
import Portion from './component/filters/portion.vue';
import { useFiltered } from '../stores/useFiltered.ts';

const filter = useFiltered();
</script>

<template>
  <aside class="bg-white rounded-2xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.05)] w-[250px] max-w-[280px] font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
    <div class="flex justify-between items-center">
      <h3 class="text-[1.1rem] font-bold text-gray-900 m-0">Filters</h3>
      <button 
        class="bg-transparent border-none text-gray-400 text-[0.85rem] font-semibold cursor-pointer px-2 py-1 rounded-md transition-all duration-200 hover:text-red-500 hover:bg-red-50" 
        type="button" 
        @click="filter.clearFilter"
      >
        Clear All
      </button>
    </div>

    <hr class="border-none h-[1px] bg-gray-100 my-4" />

    <div class="flex flex-col gap-4">
      <Categorie class="w-full" />
      <Portion class="w-full" />
      <Dietary class="w-full" />
    </div>
  </aside>
</template>