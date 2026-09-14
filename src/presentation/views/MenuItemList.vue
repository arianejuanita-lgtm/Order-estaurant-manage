<script setup lang="ts">
import MenuItem from "./component/MenuItem.vue";
import { useMenuItem } from "@/presentation/stores/useMenuItem";
import { onMounted, ref } from "vue";
import { useFiltered } from "../stores/useFiltered.ts";
import AddMenuItem from "./AddMenuItem.vue";

const filter = useFiltered();
const menu = useMenuItem();

onMounted(async () => {
    await menu.fecthMenuItems();
});

// true = fermé, false = ouvert (selon votre logique initiale v-if="!clicked")
const clicked = ref<boolean>(true);

const openDrawer = () => {
  clicked.value = false;
};

const closeDrawer = () => {
  clicked.value = true;
};
</script>

<template>
  <div class="menu-container">
    <div class="menu-header">
      <h2 class="menu-title">{{ filter.menu.length }} Menu Items</h2>
      <div class="menu-filter" @click="openDrawer" style="cursor: pointer;">
        <h3>Add menu item</h3>
      </div>
    </div>

    <div class="menu-grid">
      <MenuItem v-for="item in filter.menu" :item="item" :key="item.id" />
    </div>

    
    <div v-if="!clicked" class="drawer-overlay" @click="closeDrawer"></div>


    <div :class="['drawer', { 'drawer-open': !clicked }]">
      <div class="drawer-content">
        <button class="close-btn" @click="closeDrawer">&times;</button>
        <AddMenuItem @close="closeDrawer" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  margin-bottom: 24px;
}

.menu-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  transition: opacity 0.3s ease;
}

.drawer {
  position: fixed;
  top: 0;
  right: -450px; 
  width: 450px;
  max-width: 100%;
  height: 100vh;
  background-color: #ffffff;
  box-shadow: -4px 0 16px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  transition: right 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow-y: auto;
}

.drawer-open {
  right: 0; 
}

.drawer-content {
  padding: 20px;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: #6b7280;
}
.close-btn:hover {
  color: #111827;
}
</style>