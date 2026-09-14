<script setup lang="ts">
import Header from './presentation/views/component/Header.vue';
import { RouterView } from 'vue-router'
</script>

<template>
  <Header class="fixed top-0 left-0 right-0 w-full h-10" />
  
  <RouterView/>
</template>

