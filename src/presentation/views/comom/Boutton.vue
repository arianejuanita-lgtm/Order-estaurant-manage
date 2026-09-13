
<script setup lang="ts">
defineProps<{
  title:String,
  haut:Number
}>()
</script>

<template>
  <button :style="{ height: haut + 'px' }">
    {{ title }}
  </button>
</template>

<style scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #F5BE18;
  border: 1px solid #F5BE18;

  padding: 0 20px;
  border-radius: 20px;

  cursor: pointer;

  font-weight: bold;
}
</style>
