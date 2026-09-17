<script setup lang="ts">
import MenuItem from "./component/MenuItem.vue";
import { useMenuItem } from "@/presentation/stores/useMenuItem";
import { onMounted, ref } from "vue";
import { useFiltered } from "../stores/useFiltered.ts";
import Add from "./add.vue";
import { Plus } from "lucide-vue-next";
import type { MenuItem as MenuItemType } from "@/domain/entities/MenuItem";

const filter = useFiltered();
const menu = useMenuItem();
const isLoading = ref<boolean>(false); 

onMounted(async () => {
    isLoading.value = true;
    try {
        await menu.fecthMenuItems();
    } finally {
        isLoading.value = false;
    }
});

const clicked = ref<boolean>(true);
const selectedItem = ref<MenuItemType | null>(null);

const openDrawer = () => {
  selectedItem.value = null;
  clicked.value = false;
};

const openDrawerToEdit = (item: MenuItemType) => {
  selectedItem.value = item;
  clicked.value = false;
};

const closeDrawer = () => {
  selectedItem.value = null;
  clicked.value = true;
};
</script>

<template>
  <div class="max-w-[1200px] mx-auto p-3 font-sans relative" >
  <div class="flex justify-between items-center px-4 sm:px-6 py-4 bg-white rounded-xl shadow-xs mb-6 gap-3">
    <h2 class="text-sm sm:text-base md:text-xl font-bold text-gray-900 m-0 truncate">
      {{ filter.menu.length }} Menu Items
    </h2>
    
    <button 
      type="button"
      @click="openDrawer" 
      class="flex items-center justify-center shrink-0 gap-2 bg-amber-400 border border-amber-400 px-3 sm:px-5 py-2.5 rounded-[20px] cursor-pointer font-bold text-black text-sm transition-colors hover:bg-amber-500 shadow-xs"
    >
      <Plus :size="18" /> 
      <span class="max-[420px]:hidden">Add menu item</span>
    </button>
  </div>

    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20 gap-3">
      <svg class="animate-spin h-10 w-10 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="text-gray-500 font-medium text-sm">Loading item...</p>
    </div>

    <div v-else class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5">
      <MenuItem v-for="item in filter.menu" :item="item" :key="item.id" @edit="openDrawerToEdit" />
    </div>

    <div 
      v-if="!clicked" 
      class="fixed inset-0 w-screen h-screen bg-black/40 z-[1000] transition-opacity duration-300" 
      @click="closeDrawer"
    ></div>

    <div :class="['fixed top-0 right-0 w-[450px] max-w-full h-screen bg-white shadow-2xl z-[1001] transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] overflow-y-auto', clicked ? 'translate-x-full' : 'translate-x-0']">
      <div class="p-5 relative">
        <button 
          class="absolute top-4 right-4 bg-transparent border-none text-3xl cursor-pointer text-gray-500 hover:text-gray-900 transition-colors" 
          @click="closeDrawer"
        >
          &times;
        </button>
        <Add :initialItem="selectedItem" @close="closeDrawer" />
      </div>
    </div>
  </div>
</template>