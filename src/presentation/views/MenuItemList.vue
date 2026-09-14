<script setup lang="ts">
import MenuItem from "./component/MenuItem.vue";
import { useMenuItem } from "@/presentation/stores/useMenuItem";
import { onMounted } from "vue";
import { useFiltered } from "../stores/useFiltered.ts";

const filter=useFiltered();

const menu=useMenuItem();
onMounted(
    async ()=>{
        await menu.fecthMenuItems();
    }
)
</script>

<template>
  <div class="menu-container">
    <div class="menu-header">
      <h2 class="menu-title">{{ filter.menu.length }} Menu Items</h2>
      <div class="menu-filter">
        
      </div>
    </div>

    <div class="menu-grid">
      <MenuItem v-for="item in filter.menu" :item="item" :key="item.id" />
    </div>
  </div>
</template>

<style scoped>
.menu-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
</style>