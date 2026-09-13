<script setup lang="ts">
import Header from './presentation/views/component/Header.vue';
import { RouterView } from 'vue-router'
</script>

<template>
  
  <Header class="header" />
  <RouterView/>
 
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 80px;
}

.search {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.filter {
  background-color: whitesmoke;
  border-radius: 20px;
  border: 1px solid gray;
}

.content {
  display: grid;
  grid-template-columns: max-content 1fr;
  width: 100vw;
  box-sizing: border-box;
  padding: 0 10px;
  margin-top: 90px;
  gap: 20px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
