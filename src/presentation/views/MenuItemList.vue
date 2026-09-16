<script setup lang="ts">
import MenuItem from "./component/MenuItem.vue";
import { useMenuItem } from "@/presentation/stores/useMenuItem";
import { onMounted, ref } from "vue";
import { useFiltered } from "../stores/useFiltered.ts";
import Add from "./add.vue";
import type { MenuItem as MenuItemType } from "@/domain/entities/MenuItem";

const filter = useFiltered();
const menu = useMenuItem();

onMounted(async () => {
    await menu.fecthMenuItems();
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
  <div class="max-w-[1200px] mx-auto p-5 font-sans relative">
    <div class="flex justify-between items-center px-6 py-4 bg-white rounded-xl shadow-xs mb-6">
      <h2 class="text-xl font-bold text-gray-900 m-0">{{ filter.menu.length }} Menu Items</h2>
      
      <button 
        type="button"
        @click="openDrawer" 
        class="flex items-center justify-center bg-amber-400 border border-amber-400 px-5 py-2.5 rounded-[20px] cursor-pointer font-bold text-black text-sm transition-colors hover:bg-amber-500 shadow-xs"
      >
        Add menu item
      </button>
    </div>

    <div class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5">
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