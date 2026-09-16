<script setup lang="ts">
import Categorie from './component/filters/categorie.vue';
import Dietary from './component/filters/dietary.vue';
import Portion from './component/filters/portion.vue';
import { useFiltered } from '../stores/useFiltered.ts';
import { SlidersHorizontal } from 'lucide-vue-next';
import { ref, onMounted, onUnmounted } from 'vue';

const filter = useFiltered();
const isOpen = ref<boolean>(false);
const containerRef = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div ref="containerRef" class="relative inline-block">
    <button
      @click.stop="toggleDropdown"
      class="flex md:hidden items-center justify-center w-[40px] h-[40px] bg-white border border-gray-300 rounded-xl shadow-sm hover:border-[#F5BE18] transition-colors"
      aria-label="Ouvrir les filtres"
    >
      <SlidersHorizontal :size="20" class="text-gray-700" />
    </button>

    <aside
      :class="[
        'bg-white rounded-2xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.08)] w-[280px] font-sans transition-all duration-200',
        'max-md:absolute max-md:left-0 max-md:top-12 max-md:z-50 max-md:border max-md:border-gray-200',
        isOpen ? 'max-md:block' : 'max-md:hidden',
        'md:block md:w-[250px] md:max-w-[280px]'
      ]"
    >
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
  </div>
</template>