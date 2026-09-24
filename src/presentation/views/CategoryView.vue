<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useFilter } from '@/presentation/stores/useFilter';
import { Layers, FolderTree, Salad, Scale, RefreshCcw } from 'lucide-vue-next';
import Boutton from './comom/Boutton.vue';
import CatalogCard from './comom/CatalogCard.vue';
import Loading from './comom/Loading.vue';

const filterStore = useFilter();
const isLoading = ref<boolean>(false);
const errorMessage = ref<string>('');
const activeTab = ref<'categories' | 'dietaries' | 'portions'>('categories');

const loadData = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    await filterStore.fetchAllFilters();
  } catch (error) {
    console.error("Failed to load catalog data", error);
    errorMessage.value = "Failed to load catalog items. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadData();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
    
    <header class="bg-white border-b border-gray-100 sticky top-0 z-40 px-6 py-4 flex items-center justify-between shadow-2xs">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-2xl bg-amber-400 flex items-center justify-center shadow-xs">
          <Layers class="w-5 h-5 text-gray-900" />
        </div>
        <div>
          <h1 class="text-base font-extrabold text-gray-900 tracking-tight">Catalog Management</h1>
          <p class="text-xs text-gray-500">Manage categories, dietaries and portion sizes</p>
        </div>
      </div>

      <Boutton 
        title="Refresh" 
        :icon="RefreshCcw" 
        :click="loadData"
        class="bg-white border border-gray-200 hover:border-amber-400 text-gray-700 px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-2xs cursor-pointer"
      />
    </header>

    <main class="flex-1 max-w-7xl w-full mx-auto px-6 py-8 flex flex-col gap-6">
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex flex-col gap-1">
          <h2 class="text-2xl font-black text-gray-900 tracking-tight">Catalog Items</h2>
          <p class="text-xs text-gray-500">View and inspect your restaurant's classification elements.</p>
        </div>

        <div class="flex items-center gap-2 bg-white p-1 rounded-2xl border border-gray-200 shadow-2xs w-fit">
          <button
            @click="activeTab = 'categories'"
            class="px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
            :class="activeTab === 'categories' ? 'bg-amber-400 text-gray-900 shadow-xs' : 'text-gray-600 hover:bg-gray-50'"
          >
            <FolderTree class="w-4 h-4" />
            Categories ({{ filterStore.categories.length }})
          </button>
          
          <button
            @click="activeTab = 'dietaries'"
            class="px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
            :class="activeTab === 'dietaries' ? 'bg-amber-400 text-gray-900 shadow-xs' : 'text-gray-600 hover:bg-gray-50'"
          >
            <Salad class="w-4 h-4" />
            Dietaries ({{ filterStore.dietaries.length }})
          </button>

          <button
            @click="activeTab = 'portions'"
            class="px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
            :class="activeTab === 'portions' ? 'bg-amber-400 text-gray-900 shadow-xs' : 'text-gray-600 hover:bg-gray-50'"
          >
            <Scale class="w-4 h-4" />
            Portion Sizes
          </button>
        </div>
      </div>

      <Loading :isLoading="isLoading"/>

    

      <div v-if="errorMessage" class="bg-red-50 border border-red-200 p-4 rounded-2xl text-red-600 text-xs font-semibold text-center">
        {{ errorMessage }}
      </div>

      <div v-else-if="activeTab === 'categories'" class="flex flex-col gap-4">
        <div v-if="filterStore.categories.length === 0" class="bg-white border border-dashed border-gray-200 p-12 rounded-2xl flex flex-col items-center justify-center text-center gap-3">
          <FolderTree class="w-8 h-8 text-amber-500" />
          <p class="text-sm font-bold text-gray-800">No categories found</p>
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <CatalogCard 
            v-for="cat in filterStore.categories" 
            :key="cat.id"
            :title="cat.label"
            :id="cat.id"
            colorTheme="amber"
          />
        </div>
      </div>

      <div v-else-if="activeTab === 'dietaries'" class="flex flex-col gap-4">
        <div v-if="filterStore.dietaries.length === 0" class="bg-white border border-dashed border-gray-200 p-12 rounded-2xl flex flex-col items-center justify-center text-center gap-3">
          <Salad class="w-8 h-8 text-emerald-500" />
          <p class="text-sm font-bold text-gray-800">No dietary requirements found</p>
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <CatalogCard 
            v-for="diet in filterStore.dietaries" 
            :key="diet.id"
            :title="diet.label"
            :id="diet.id"
            colorTheme="emerald"
          />
        </div>
      </div>

      <div v-else-if="activeTab === 'portions'" class="flex flex-col gap-4">
        <div v-if="!filterStore.portionSizes || (Array.isArray(filterStore.portionSizes) && filterStore.portionSizes.length === 0)" class="bg-white border border-dashed border-gray-200 p-12 rounded-2xl flex flex-col items-center justify-center text-center gap-3">
          <Scale class="w-8 h-8 text-blue-500" />
          <p class="text-sm font-bold text-gray-800">No portion sizes found</p>
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <template v-if="Array.isArray(filterStore.portionSizes)">
            <CatalogCard 
              v-for="portion in filterStore.portionSizes" 
              :key="portion.id"
              :title="portion.label"
              :id="portion.id"
              colorTheme="blue"
            />
          </template>
        </div>
      </div>

    </main>
  </div>
</template>