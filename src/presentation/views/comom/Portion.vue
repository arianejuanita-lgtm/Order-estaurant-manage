<script setup lang="ts">
defineProps<{
  title: string,
  // ontap: (event: MouseEvent) => void;
}>()


</script>

<template>
  <button >
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
}
</style>
