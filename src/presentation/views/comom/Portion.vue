<script setup lang="ts">
defineProps<{
  title: string;
  isSelected?: boolean;
  ontap?: () => void;
}>();
</script>

<template>
  <button :class="{ 'selected-border': isSelected }" @click="ontap">
    {{ title }}
  </button>
</template>

<style scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid gray;
  padding: 0 10px;
  border-radius: 20px;
  height: 25px;
  cursor: pointer;
  font-weight: bold;
  background-color: transparent;
  transition: all 0.2s ease;
}

.selected-border {
  border-color: #F5BE18; 
}
</style>