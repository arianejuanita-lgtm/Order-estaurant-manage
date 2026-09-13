<!-- <script setup lang="ts">
import sortOptions from '@/data/selected';
import { ref } from 'vue';

const liste = ref(sortOptions);
const selectedValue = ref('popular'); // valeur par défaut
</script>

<template>
  <div class="sort-wrapper">
    <label for="select" class="sort-label">Sort by :</label>
    <div class="select-container">
      <select 
        name="select" 
        id="select" 
        v-model="selectedValue"
        class="sort-select"
      >
        <option 
          v-for="item in liste" 
          :key="item.id" 
          :value="item.id"
          class="sort-option"
        >
          {{ item.label }}
        </option>
      </select>
      <span class="arrow">▼</span>
    </div>
  </div>
</template>

<style scoped>
.sort-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.sort-label {
  font-size: 14px;
  font-weight: 600;
  color: #555;
  white-space: nowrap;
}

.select-container {
  position: relative;
  display: inline-block;
}

.sort-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 10px 40px 10px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 180px;
  outline: none;
}

.sort-select:hover {
  border-color: #F5BE18;
  box-shadow: 0 2px 8px rgba(229, 57, 53, 0.15);
}


.sort-option {
  padding: 10px 16px;
  font-size: 14px;
  color: #333;
  background: #fff;
}



.arrow {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 10px;
  color: #888;
  transition: color 0.2s;
}


</style> -->